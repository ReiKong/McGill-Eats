const Suggestion = (props) => {
    const onClickHandler = () => {
        props.onClick({
            id: props.id,
            placeName: props.placeName,
            rating: props.rating,
            cuisine: props.cuisine,
            street: props.street,
            isOpen : props.isOpen,
            price: props.price, /* string */
            flexAccount: props.flexAccount, /* boolean */
            oneCard: props.oneCard /* boolean */
        });
    }
        
    return (
        <div onClick = {onClickHandler} className='place-overview'>
            <p>{props.place_name}</p>
            <p>{props.rating}</p>
            <p>{props.cuisine} · {props.street}</p>
            <p>{}</p>
            <p>
                <span>{props.price}</span>
                {props.flexAccount &&
                    <span> · Flex Account</span>
                }
                {props.oneCard && 
                    <span> · 
                        <img style={{ height: 22 }} src={oneCardLogoGray}></img>
                    </span>
                }
                
            </p>
        </div>
        
    );
};

export default Suggestion;
