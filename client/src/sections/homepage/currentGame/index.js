import smoke from "../../../assets/img/yellow-smoke.webp";
import { Cta } from "../../../components/commons/Cta";
export default function CurrentGame() {
  return (
    <div style={{
      backgroundImage: `url(${smoke.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} className="my-12">
      <h2 className="text-display-small text-gold text-center mb-12">
        LA LEYENDA DEL KITSUNE
      </h2>
      <div className="flex flex-row items-center p-6 gap-12">
        <div className="flex flex-col gap-6">
          <p className="text-headline-small text-primary-100 text-center" style={{textWrap: "pretty"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper suscipit vulputate. Vivamus feugiat pellentesque enim,
            vel blandit tellus viverra eget. Maecenas porttitor placerat eros
            non commodo. Nam aliquam facilisis ante eget euismod. In hac
            habitasse platea dictumst. Maecenas non.
          </p>
          <Cta className="">CONOCE MÁS</Cta>
        </div>
        <div>
          <iframe
            width="710"
            height="439"
            src="https://www.youtube.com/embed/YaLd4z8RWpY"
            title="Devil May Cry - Announcement Trailer | Netflix"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
