import Slider from 'react-infinite-logo-slider'
import keralaStartup from "../../assets/logos/keralaStartup.png"
import mulearn from "../../assets/logos/mulearn.png"
import tinkerhub from "../../assets/logos/tinkerhub.png"
export const LogoSlider = () => {
    
    return (
        <Slider
            width="250px"
            duration={20}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
        >
            <Slider.Slide>
                <img src={mulearn} alt="mulearn" className='w-32' />
            </Slider.Slide>
            <Slider.Slide>
                <img src={keralaStartup} alt="keralaStartup" className='w-32' />
            </Slider.Slide>
            <Slider.Slide>
                <img src={tinkerhub} alt="tinkerhub" className='w-32' />
            </Slider.Slide>
            <Slider.Slide>
                <img src={mulearn} alt="mulearn" className='w-32' />
            </Slider.Slide>
            <Slider.Slide>
                <img src={keralaStartup} alt="keralaStartup" className='w-32' />
            </Slider.Slide>
            <Slider.Slide>
                <img src={tinkerhub} alt="tinkerhub" className='w-32' />
            </Slider.Slide>
        </Slider>
    )
}              
                     
