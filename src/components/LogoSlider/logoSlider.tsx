import Marquee from "react-fast-marquee";
import mulearn from "../../assets/logos/mulearn.png";
import keralaStartup from "../../assets/logos/keralaStartup.png";
import tinkerhub from "../../assets/logos/tinkerhub.png";

export const LogoSlider = () => {
  return (
    <Marquee pauseOnHover speed={30}>
      {[
        mulearn,
        keralaStartup,
        tinkerhub,
        mulearn,
        keralaStartup,
        tinkerhub,
        mulearn,
        keralaStartup,
        tinkerhub,

        mulearn,
        keralaStartup,
        tinkerhub,
      ].map((logo, index) => (
        <img key={index} src={logo} alt="logo" className="mx-6 w-20 " />
      ))}
    </Marquee>
  );
};
