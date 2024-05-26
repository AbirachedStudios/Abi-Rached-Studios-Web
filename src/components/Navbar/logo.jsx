import Image from "next/image";
import logo from "../../assets/img/ARS-VECTOR.png";

export default function Logo() {
  return (
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <Image src={logo} alt="Abi Rached Studios logo" width={75} height={75} />
      <div>
        <p className="font-headline-large text-headline-large text-gold font-bold">
          ABI RACHED
        </p>
        <p className="font-headline-large text-headline-large text-gold font-bold">
          STUDIOS
        </p>
      </div>
    </a>
  );
}
