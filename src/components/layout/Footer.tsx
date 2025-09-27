import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-footer text-white py-12 mt-20"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/liftronic.png"
              alt="Liftronic logo"
              width={48}
              height={48}
              className="size-12"
            />
            <span className="font-semibold text-lg">Liftronic</span>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Elevators engineered for precision and reliability.
          </p>
        </div>
        <div>
          <div className="font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><a href="#products" className="hover:text-accent">Products</a></li>
            <li><a href="#services" className="hover:text-accent">Services</a></li>
            <li><a href="#clients" className="hover:text-accent">Clients</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Offices</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Head Office, City</li>
            <li>Branch, City</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Connect</div>
          <div className="mt-3 flex gap-3 text-sm">
            <a href="#" className="hover:text-accent">LinkedIn</a>
            <a href="#" className="hover:text-accent">Twitter</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10 text-xs text-white/60">
        © {new Date().getFullYear()} Liftronic Elevator. All rights reserved.
      </div>
    </footer>
  );
}
