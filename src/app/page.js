import Image from "next/image";
import Appbar from "./components/appbar";
import Picture from "./components/picture";
import Content from "./components/content";

export default function Home() {
  return (
    <main>
      <Appbar/>
      <Picture/>
      <Content/>
    </main>
  );
}
