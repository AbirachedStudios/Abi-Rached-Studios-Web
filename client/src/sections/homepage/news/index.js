import square1 from "../../../assets/img/newsimg1.webp";
import square2 from "../../../assets/img/newsimg2.webp";
import square3 from "../../../assets/img/newsimg3.webp";
import square4 from "../../../assets/img/newsimg4.webp";
import square5 from "../../../assets/img/newsimg5.webp";
import square6 from "../../../assets/img/newsimg6.webp";
import Image from "next/image";
import Link from "next/link";

export default function NewsSectionHomepage() {
  return (
    <>
      <div className="flex flex-row justify-around my-12">
        <Image src={square1} width={140} height={140} />
        <Image src={square2} width={140} height={140} />
      </div>
      <div className="flex flex-row justify-around items-center my-12">
        <Image src={square3} width={140} height={140} />
        <div className="flex flex-col items-center">
          <h2 className="text-headline-large text-primary-100 w-[753px] text-center">
            Enterate de las ultimas{" "}
            <span className="text-primary-60">novedades</span>, nuevos proyectos
            y eventos...
          </h2>
          <Link
            href="#"
            className="mt-6 px-12 py-4 text-body-large text-center border-2 border-gold text-gold hover:text-primary-60 hover:border-primary-60 transition-colors duration-300"
            style={{ borderRadius: "5px" }}
          >
            VER MAS
          </Link>
        </div>
        <Image src={square4} width={140} height={140} />
      </div>
      <div className="flex flex-row justify-around">
        <Image src={square5} width={140} height={140} />
        <Image src={square6} width={140} height={140} />
      </div>
    </>
  );
}
