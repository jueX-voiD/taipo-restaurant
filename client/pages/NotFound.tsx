import Seo from "@/components/Seo";
import TaipoButtonSecondary from "@/components/ui/TaipoButtonSecondary";
import bg404 from "@/assets/404-bg.webp";
import error404 from "@/assets/404_Error.svg";
import errorbg from "@/assets/404-container-bg.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-taipo flex flex-col items-center justify-center px-5 text-center ">
      <Seo title="Page Not Found » Taipo" path="/404/" noindex />
      <div className="absolute top-0 w-full">
        <img src={bg404} alt="" className="object-cover h-[327px] min-w-full" />
      </div>
      <div className="max-w-[1200px] w-full bg-white relative flex justify-center flex-col p-5 gap-5 items-center">
        <img src={error404} alt="404" className="object-contain h-[282px] " />
        <p className="font-SofiaPro text-taipo text-32">Oh no!</p>
        <h1 className="font-SofiaPro uppercase text-[24px] text-taipo-dark font-semibold py-5">
          Something went wrong
        </h1>

        <TaipoButtonSecondary
          to="/"
          className="hover:bg-taipo-dark hover:text-white z-10"
        >
          Go Home
        </TaipoButtonSecondary>
        <img
          src={errorbg}
          alt=""
          className="absolute bottom-0 object-cover h-[123px]"
        />
      </div>
    </div>
  );
}
