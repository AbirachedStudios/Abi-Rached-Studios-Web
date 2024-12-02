import smoke from "../../../assets/img/yellow-smoke.webp";
import { Cta } from "../../../components/commons/Cta";
export default function CurrentGame() {
  return (
    <div
      style={{
        backgroundImage: `url(${smoke.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="my-6 md:my-12"
    >
      <h2 className="text-headline-small md:text-display-small text-gold text-center mb-2 md:mb-12">
        LA LEYENDA DEL KITSUNE
      </h2>
      <div className="flex flex-col md:flex-row items-center p-6 gap-12">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <p
            className="text-title-medium md:text-headline-small text-primary-100 text-center"
            style={{ textWrap: "pretty" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper suscipit vulputate. Vivamus feugiat pellentesque enim,
            vel blandit tellus viverra eget. Maecenas porttitor placerat eros
            non commodo. Nam aliquam facilisis ante eget euismod. In hac
            habitasse platea dictumst. Maecenas non.
          </p>
          <Cta className="text-title-large">CONOCE MÁS</Cta>
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <iframe
            className="w-[390px] md:w-[710px] h-[283px] md:h-[439px]"
            src="https://www.youtube.com/embed/YaLd4z8RWpY"
            title="Devil May Cry - Announcement Trailer | Netflix"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
