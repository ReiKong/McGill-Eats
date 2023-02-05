from django.shortcuts import render
import googlemaps
from decouple import config
import datetime
from .models import Restaurant
from .serializers import RestaurantSerializer
# to create a single entry point to our API
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse # to return fully-qualified URLs;
# converting generic views to function-based views
from rest_framework import status

# Create your views here.
def miles_to_meters(miles):
    try: 
        return miles * 1_609.344
    except:
        return 0
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        #'users': reverse('user-list', request=request, format=format),
        'restaurants': reverse('restaurant-list', request=request, format=format)
    })

@api_view(['GET', 'POST'])
def restaurant_list(request, format=None):
    if request.method == 'GET':
        restaurants = Restaurant.objects.all()
        #diaries = Diary.objects.filter(author=request.user)
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # request.data["field name"]
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def restaurant_detail(request, pk, format=None):
    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        # dummy origin value TODO get the data from frontend
        # request.data["location"]
        origin = (45.51075953584384, -73.57612033563127)
        # get destination
        gmaps = googlemaps.Client(key= config("GOOGLE_API_KEY"))
        distance = miles_to_meters(5)
        search_string = restaurant.name
        response = gmaps.places_nearby(
            location = origin,
            keyword = search_string,
            radius = distance
        )
        # TODO check if the response exists
        print(response)
        location = response["results"][0]["geometry"]["location"]
        destination = (location["lat"], location["lng"])
        print("origin is... ", origin, "destination is... ", destination)
        now = datetime.datetime.now()
        result = gmaps.distance_matrix(
            origin,
            destination,
            mode="walking",
            departure_time=now
        )
        result_status = result['rows'][0]['elements'][0]['status']
        if result_status == 'OK':
            # TODO text vs value? if value, easier to sort, but unit disappears.
            # is there a way to store the unit?
            restaurant.distance = result['rows'][0]['elements'][0]['distance']['text']
            restaurant.duration = result['rows'][0]['elements'][0]['duration']['text']
            restaurant.save()
            print("The response contains a valid result.")
        elif result_status == "NOT_FOUND":
            print("The origin and/or destination of this pairing could not be geocoded.")
        elif result_status == "ZERO_RESULTS":
            print("No route could be found between the origin and destination.")
        return Response(serializer.data)
    elif request.method == 'DELETE':
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)