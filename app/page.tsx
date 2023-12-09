"use client";

import { useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import MapComponent from "@/components/maps/MapComponent";
import { Tab, Tabs } from "@nextui-org/tabs";

export default function Home() {
  const [sidebar, setSidebar] = useState(true);

  const sideFunction = () => {
    setSidebar((state) => !state);
  };

  return (
    <section className="relative overflow-y-auto w-full h-full flex">
      <div
        className={`absolute inset-y-0 h-full left-0 z-10 flex w-full flex-col overflow-y-hidden bg-gray-4 duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebar ? "translate-x-0" : "-translate-x-full w-0"
        }`}
      >
        <ScrollShadow hideScrollBar className="w-full h-full">
          <button
            type="button"
            className="inline-flex lg:hidden absolute z-10 right-1 mt-1 p-1 rounded-sm bg-white shadow"
            onClick={sideFunction}
          >
            <MdClose className="w-4 h-4" />
          </button>
          <MapComponent />
        </ScrollShadow>
      </div>

      <div
        className={`relative w-full p-4 border-l-2 border-stroke ${
          sidebar ? "max-w-md" : ""
        }`}
      >
        <button
          type="button"
          className={`static lg:absolute z-10 -left-[2.6rem] top-10 rounded-l-lg rounded-r-none px-3 py-2 bg-white shadow ${
            !sidebar ? "left-auto right-10 border rounded-r-lg" : ""
          }`}
          onClick={sideFunction}
        >
          {!sidebar ? (
            <MdChevronRight className="w-4 h-4" />
          ) : (
            <MdChevronLeft className="w-4 h-4" />
          )}
        </button>
        <ScrollShadow hideScrollBar className="w-full h-full">
          <div className="gap-4">
            <Tabs variant="underlined" aria-label="Tabs variants">
              <Tab key="photos" title={<div>
                <p>lala</p>
                <p>pero</p>
              </div>}>
                <div>
                  this is page photo  
                </div>
              </Tab>
              <Tab key="music" title="Music" />
              <Tab key="videos" title="Videos" />
            </Tabs>
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          laudantium, tenetur dolores, ea quas libero dolore labore perspiciatis
          quasi delectus facere quibusdam. Distinctio perspiciatis in maxime
          delectus laborum recusandae dolorem soluta error veritatis. Quod dolor
          maxime, explicabo sit animi illo. Explicabo deleniti unde et eveniet
          veritatis modi dignissimos laborum. Nobis ut ipsum hic incidunt
          officia illum vitae voluptatum aliquam sed iusto esse itaque,
          architecto fuga, unde libero voluptatibus animi maiores nemo eos rem
          et? Atque velit ipsum quas, aspernatur suscipit est molestiae veniam
          hic repellat iusto voluptates totam sunt, numquam, pariatur optio cum
          earum amet ad excepturi dolore! Aliquid facilis eum numquam,
          doloremque eaque laborum obcaecati molestiae, culpa veniam enim, illum
          at facere unde saepe voluptatum exercitationem omnis expedita totam in
          quia distinctio! Maiores, culpa! Enim dignissimos beatae voluptatem
          facere vel provident perspiciatis unde deserunt optio quaerat repellat
          officia non ab dolore, sapiente sequi omnis eos eius itaque! Quo
          repellat sapiente hic repudiandae harum animi autem sint, distinctio
          suscipit pariatur obcaecati voluptatibus quae id cupiditate nostrum
          illo ex illum quos libero rem! Repellat rerum cumque mollitia dolore
          ducimus aliquam doloribus odio libero voluptatem minus ipsa
          dignissimos aspernatur ut omnis deserunt facere quo facilis aliquid,
          eaque voluptatum non reiciendis blanditiis sunt. Voluptatem, eum.
          Nulla minima vitae architecto! Eligendi sapiente ab aliquam esse
          libero et corporis fuga nulla commodi iusto. Obcaecati repellat
          dignissimos eum minus, adipisci officiis! Beatae vero dignissimos,
          similique labore quaerat veritatis possimus optio? Impedit recusandae
          assumenda debitis iusto inventore, quas quaerat, adipisci, dignissimos
          nobis iure hic accusamus odio obcaecati facilis. Doloremque iste
          pariatur reprehenderit dolore dolorem velit perspiciatis voluptas
          repellendus, doloribus maiores ratione dolorum harum culpa soluta.
          Deserunt voluptatem provident magnam voluptatum saepe sed incidunt
          dicta debitis perferendis, aliquam dolorem fugit nobis deleniti
          voluptate maiores placeat nihil voluptatibus ea reprehenderit
          voluptates amet rem vero. Voluptatem eius sequi in, aspernatur commodi
          distinctio animi aliquid dolore repellendus quis pariatur dolores
          incidunt delectus, maxime expedita rem laudantium voluptatibus
          cupiditate, eaque voluptates. Voluptates nostrum modi magni obcaecati
          impedit! Earum autem nisi dolorem. Quaerat iste unde cupiditate esse,
          dolore similique nostrum maiores sequi sint voluptate ipsum facere,
          quidem vero. Ullam sapiente odio atque non iusto! Quia perferendis
          suscipit iste fugiat saepe accusamus maxime alias culpa autem quos,
          asperiores officia. Numquam rerum unde neque dolores quasi aut porro
          officia sed, reiciendis officiis voluptatem magnam mollitia
          blanditiis? Non amet ratione porro maiores sed, excepturi perspiciatis
          delectus nihil animi eveniet voluptates aliquid, et neque quia
          reiciendis vitae libero dolore ipsum, corrupti suscipit pariatur
          quisquam iste illo quas! Reiciendis accusamus quos aut odit ipsam quas
          facere quasi autem in error nemo blanditiis architecto vel, et,
          tempora doloremque repellat ipsa sapiente vero asperiores? Similique
          cum nemo ratione reiciendis exercitationem nihil suscipit minima
          tempore odio beatae ab laboriosam eligendi, voluptas laborum repellat
          temporibus. Nihil itaque quia adipisci dolore, accusamus eos
          reprehenderit ipsa, nostrum, ex vel maiores similique dignissimos
          autem dolor iste commodi culpa voluptates odio magnam quas? Dicta
          dolorum tempore corrupti consequatur id quis reiciendis commodi
          perferendis officiis optio, ex eaque et maxime eius voluptatibus earum
          consequuntur nam sed pariatur iure atque, rerum voluptates. Cumque
          debitis tenetur saepe beatae necessitatibus aliquid molestias nam iure
          placeat. Maiores iste et quisquam inventore, quam incidunt quae modi,
          hic mollitia corporis assumenda! Eaque, illum ut tempora velit veniam
          fugiat deserunt, reiciendis, temporibus fuga recusandae placeat
          dolore. Exercitationem, cumque voluptates. Rem laboriosam quis harum
          at ut praesentium assumenda, obcaecati amet magni, quaerat nemo autem
          ducimus expedita natus repudiandae dolore, esse neque est aspernatur
          illum voluptas? Quo, amet esse placeat sint modi nostrum hic ipsa,
          possimus accusantium ab ut. Non sequi, reprehenderit sint a, iusto
          eligendi sunt quae vel corporis officia quas iste incidunt
          necessitatibus voluptate assumenda, ratione reiciendis voluptas
          tempora? Eligendi error obcaecati et soluta ducimus quas, hic officiis
          nisi! Vitae modi doloribus aliquam eligendi iure qui quae ab aliquid
          vel itaque, corrupti commodi in quidem ipsum ipsa tenetur voluptate
          harum voluptatum necessitatibus? Nam optio sit ullam corporis quas
          earum illum libero quam itaque. Corrupti maiores repellendus impedit
          iusto voluptates veritatis error vitae ipsam nam reiciendis suscipit,
          quis enim, ipsum tempore dignissimos culpa molestiae omnis, tempora
          quam possimus inventore rerum voluptatum eos aut. Voluptate numquam
          veritatis minima dolorum nihil blanditiis deserunt, placeat maiores
          molestias quas. Suscipit sint vero ab pariatur quaerat quos, obcaecati
          ratione hic fugit mollitia maiores ad quis, veniam ipsam voluptatibus
          laudantium sequi possimus. Ut doloremque asperiores hic eos? Harum
          nesciunt iste fugit quas dolorem architecto doloribus ex, id eos?
          Quas, amet pariatur facilis cumque totam veritatis inventore
          praesentium, perspiciatis nihil reprehenderit omnis saepe. Veritatis
          praesentium ut possimus ex eveniet corrupti ipsam optio, accusantium,
          ullam iusto magni dolorum sunt repudiandae incidunt minus tenetur
          laboriosam enim provident odio earum, deserunt aut totam a assumenda.
          Sunt eum libero tempore nam officia quod officiis est facere vitae,
          ipsum mollitia accusamus fugit expedita a iusto! Harum expedita itaque
          animi repellat error distinctio, explicabo delectus nisi, illo aut
          voluptas, possimus odio eligendi excepturi maxime dolore corrupti qui
          dolorum enim odit. Porro, molestiae sed? Culpa quos facilis dolores
          reiciendis sed, quod ducimus velit, quis, illum in debitis. Obcaecati
          eveniet cumque libero placeat vitae tempora quas quidem laudantium
          veritatis, praesentium dolores suscipit laborum autem dicta totam.
          Dignissimos, explicabo voluptatum. Repellat distinctio ipsa eum at
          saepe, quibusdam ab ex consectetur magnam et tenetur laudantium odit
          exercitationem. Dicta voluptates aliquam eius, excepturi repudiandae
          voluptatem atque porro, molestiae modi non autem maxime voluptas
          cupiditate soluta id fugiat inventore iste quam voluptatum in cumque.
          A repellendus, modi quo sint iste veniam nisi eos porro quasi facilis,
          quam veritatis aliquid quibusdam. Maiores distinctio corporis error
          quae explicabo deserunt laboriosam laudantium exercitationem soluta?
          Laboriosam animi suscipit qui! Necessitatibus, minus eveniet nostrum
          labore id officiis error exercitationem reprehenderit saepe. Sit esse
          officia quia odio placeat eaque blanditiis amet neque totam
          repudiandae maiores doloribus, ipsam ducimus sint eveniet aperiam nemo
          voluptas vero aliquam corporis! Ab nostrum corporis vero fugit. Velit,
          quaerat doloribus. Expedita, perspiciatis error ratione corporis
          dolorum consectetur officiis at reprehenderit qui dicta! Totam vero
          recusandae aperiam, sed nemo quisquam maxime sunt, harum esse
          doloribus dolorum hic, molestiae porro vitae fugit praesentium soluta
          aliquam. Iure, similique magni?
        </ScrollShadow>
      </div>
    </section>
  );
}
