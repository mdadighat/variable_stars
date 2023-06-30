import buttonImg from '../assets/yellow-button.png'

function BuyMeACoffeeButton() {
    return (    
        <a href="https://www.buymeacoffee.com/tauridosastro" target="_blank">
            <img style={{ height: "35px"}}
                src={buttonImg}
                alt="Buy Me A Coffee" />
        </a>
    );
}

export default BuyMeACoffeeButton;