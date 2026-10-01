import Seo from "@/components/Seo";
import MenuSection from "@/components/MenuSection";
import downloadmenu from "@/assets/download-menu.webp";
import menuPdf from "@/assets/taipo-wall-menu.pdf";

function ArrowRightIcon() {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3986 3.09334L26.4945 13.8894L15.3986 24.6854L14.3373 23.6528L23.6174 14.6236L2.41602 14.6236L2.41602 13.1551L23.6174 13.1551L14.3373 4.12591L15.3986 3.09334Z"
        fill="white"
      />
    </svg>
  );
}

function DownloadSection() {
  return (
    <section className="w-full bg-taipo-bg-light">
      <div className="max-w-[1200px] mx-auto px-5 py-16 lg:py-[100px]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[100px]">
          {/* Left: image */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <img
              src={downloadmenu}
              alt="TAIPO Menu"
              className="w-full h-auto object-cover max-h-[377px] rounded-sm"
            />
          </div>

          {/* Right: text + button */}
          <div className="flex flex-col gap-12 lg:gap-[60px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-72 uppercase">Download our Menu</h2>
              <p className="text-18">
                Get our menu and order online whenever you feel hunger.
              </p>
            </div>

            {/* <a
              href={menuPdf}
              download="taipo-wall-menu.pdf"
              className="flex items-center gap-6 bg-taipo-teal text-white text-20 px-8 py-4 w-fit hover:bg-taipo-teal-dark transition-colors"
            >
              Download PDF
              <ArrowRightIcon />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Menu() {
  return (
    <div>
      <Seo path="/menu/" />
      <main>
        <MenuSection showOrderButton={true} headingAs="h1" />
        <DownloadSection />
      </main>
    </div>
  );
}
