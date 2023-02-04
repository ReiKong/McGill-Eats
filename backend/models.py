import time
from django.db import models
import json
import spotipy
import webbrowser
# google_cloud_ocr
import os
import io
from google.cloud import vision
import openai

fpath = "/Users/joekimkh/Desktop/sad.jpg"

# Create your models here.
class Diary(models.Model):
    #author = models.ForeignKey('auth.User', related_name='diaries', on_delete=models.CASCADE)
    #title = models.CharField(max_length=120, default="no title", unique=True)
    content = models.TextField(default="Write Here")
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    is_liked = models.BooleanField(default=False)
    mood = models.CharField(max_length=10, null=True, blank=True)
    music = models.URLField(max_length=200, null=True, blank=True)
    def google_cloud_ocr(self, path):
        """Detects document features in an image."""
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "/Users/joekimkh/Downloads/hackthon23-df6b6798f88b.json"
        client = vision.ImageAnnotatorClient()

        with io.open(path, 'rb') as image_file:
            content = image_file.read()

        image = vision.Image(content=content)

        response = client.document_text_detection(image=image)
        if response.error.message:
            raise Exception(
                '{}\nFor more info on error messages, check: '
                'https://cloud.google.com/apis/design/errors'.format(
                    response.error.message))
        
        return response.full_text_annotation.text
        
    def GPTchat(self, text):
        # Replace "YOUR_API_KEY" with your OpenAI API key
        openai.api_key = ""

        prompt = "in one word and without repeating the question, what is the emotion behind this text " + text

        # Generate a response from the model
        completions = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )
        # Print the response
        response_text = completions.choices[0].text
        return response_text
    
    def save(self, *args, **kwargs):
        # to update the mood field when we create the object
        if self.content == None:
            # access the file using the file path
            text = self.google_cloud_ocr(fpath)
            self.content = text
            self.mood = self.GPTchat(text)
        else:
            self.mood = self.GPTchat(self.content)
        self.music = self.play_music()
        super().save(*args, **kwargs)

    def play_music(self, *args, **kwargs):
        username = '31b7rcws54ucl3wqtj2hpn5r5uey'
        clientID = 'ebda86342f1f4cdd94ae46612d5318c5'
        clientSecret = 'b78009b89249482a8b357384d6bab429'
        redirect_uri = 'http://google.com/callback/'
        oauth_object = spotipy.SpotifyOAuth(clientID, clientSecret, redirect_uri)
        # get the token as proof of our authorized access to Spotify.
        token_dict = oauth_object.get_access_token()
        token = token_dict['access_token']
        # the token generated in the previous step gets authorized.
        spotifyObject = spotipy.Spotify(auth=token)
        user_name = spotifyObject.current_user()
        # This user information is used to retrieve the JSON response sent by the browser to our system. 
        # The print statement here is used to print this JSON response in readable format.
        print(json.dumps(user_name, sort_keys=True, indent=4))
        search_song = self.mood
        results = spotifyObject.search(search_song, 1, 0, "track")
        songs_dict = results['tracks']
        song_items = songs_dict['items']
        song = song_items[0]['external_urls']['spotify']
        return song
    def _str_(self):
        return self.title
    class Meta:
        ordering = ['created_at']

"""
class Playlist(models.Model):
    # get playlist name and set title to be that name.
    title = models.CharField(max_length=120, default="no title", unique=True)
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)
    # do we need more attributes?
    def _str_(self):
        return self.title
"""