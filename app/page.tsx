"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Sidebar from "@/components/maps/sidebar";
import { useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { MdArrowBack, MdChevronLeft } from "react-icons/md";

export default function Home() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <section className="relative overflow-y-auto w-full h-full flex">
      <div
        className={`p-4 absolute inset-y-0 h-full left-0 z-10 flex w-full lg:w-2/3 flex-col overflow-y-hidden bg-gray-4 duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ScrollShadow hideScrollBar className="w-full h-full">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt deleniti molestias, saepe vel eius, incidunt nemo veniam porro suscipit tempore non facilis odio cum itaque delectus laboriosam. Neque dicta, expedita ea eum similique consequuntur quaerat modi tenetur esse dolores quibusdam dolor, officia dolore omnis quis doloremque nihil iste iure illum reiciendis voluptas aspernatur? Tempora commodi corrupti quaerat aliquam reiciendis harum, tempore cupiditate numquam praesentium est dignissimos veniam itaque dolorem ipsa esse quod, maxime provident hic debitis fugiat inventore labore repellendus! Autem facilis dicta unde, odit dolorum nisi impedit laboriosam doloribus perspiciatis harum, sapiente maxime non assumenda enim eos illum excepturi consequatur fuga necessitatibus doloremque quisquam dolore? Quaerat consequatur dolores aut sit dolor voluptatum facere odit provident, sed nostrum labore quis quod eos repellat deserunt voluptas assumenda architecto nisi amet ipsam. Velit iste sint fuga et eveniet ipsum quos aperiam? Fugit maxime omnis, et numquam repellat saepe doloremque ut porro, veniam iusto eveniet corrupti repellendus quisquam laborum enim velit eos. Ad voluptas officiis aliquam placeat, saepe cumque, tenetur obcaecati, a atque fuga architecto! Porro reprehenderit at tenetur, pariatur molestiae numquam iure quidem quibusdam ut voluptatum ex nisi inventore voluptate nesciunt fuga animi vitae magnam autem soluta ducimus distinctio quis! Esse, quisquam itaque! Ex nisi, ratione sapiente corporis quasi maiores! Molestias sed doloremque quia in similique cupiditate impedit, omnis maxime dolore enim officia pariatur ad nisi, ut id nihil atque, reiciendis necessitatibus. Ex in, molestias tempore, illo possimus, perferendis doloribus maiores voluptatibus aliquam est nulla neque debitis eos accusantium repellat voluptatum expedita recusandae dignissimos nisi libero laboriosam. Minus quibusdam unde maxime! Delectus cupiditate voluptates saepe cum vitae quis officia nam voluptate? Esse soluta laudantium aliquam, distinctio enim, repellat, tempora eveniet deserunt molestiae perspiciatis itaque! Rerum numquam aliquam reprehenderit inventore ullam? Nisi illum voluptate nemo distinctio harum nostrum illo corporis, consectetur, eveniet quo iure animi! Vitae ipsam tempora atque fuga! Nihil ab eum, nobis voluptatum quasi facere, harum voluptas accusamus tempora optio vel, ipsum aliquid? Sit dolore ullam tenetur sint odit laborum dolor, quisquam minus neque vitae blanditiis ab possimus et molestias. Dignissimos labore illum, obcaecati commodi a excepturi! Obcaecati eum saepe eos accusantium libero vero pariatur tempora corporis doloremque perferendis sed porro, deleniti non ipsa, id doloribus molestias magni exercitationem autem qui ea? Recusandae magnam tempora obcaecati odit aperiam ducimus, reprehenderit quidem saepe ratione atque sed nulla labore, mollitia ad magni quis voluptas, eius libero dignissimos maiores reiciendis repudiandae laboriosam ab? Itaque ratione mollitia quae voluptates praesentium atque velit odit! Optio incidunt molestiae, dolorum quisquam dolorem quod neque veniam, eius molestias, sapiente quos officiis voluptatum dignissimos culpa ipsum perferendis quasi. At, molestiae beatae cumque adipisci dolores odit quod! Nihil suscipit quisquam quidem sint consequuntur quas unde rerum magni hic voluptatibus ducimus esse est tempora assumenda quam repellat dolor, fugiat odio corrupti possimus ratione. Reiciendis repellat tempore fugiat numquam magnam unde cum expedita cupiditate incidunt! Doloremque perspiciatis modi amet omnis nemo ad veniam aliquid, quo laborum repellendus dolore. Soluta eaque dolore est repellendus tempore, odio quia excepturi debitis veniam omnis repellat culpa in vitae dicta nobis ea veritatis nemo, sit voluptate sunt harum. Error eius dolor consectetur unde aut architecto fugiat? Expedita dolore tempora veritatis nostrum numquam, necessitatibus eaque sed autem, amet fuga quibusdam est natus nemo. Laborum repellendus quod nobis, tempore rerum alias deleniti sunt necessitatibus. Aut, illo molestias quis commodi tempora odit assumenda modi quas ipsum voluptate consequatur quisquam ea, deserunt mollitia, sunt doloribus laboriosam atque cum beatae inventore ab consequuntur. Cupiditate nesciunt quaerat aspernatur, exercitationem, unde vel adipisci ab minus et voluptatem itaque dolor illum. Fugiat quisquam tempore dolor eum beatae iure ad sit voluptas omnis libero, iste dignissimos molestias vel modi, odio, veniam reprehenderit. Autem cumque quae quis! Vitae commodi velit odio similique possimus, unde distinctio eaque? Facilis debitis dolores non quos eligendi molestias aliquid quam sapiente adipisci minima vero impedit, eaque, atque ratione corporis! Vero dolorem aliquam quas quibusdam soluta similique sit repudiandae corrupti fuga, quam modi doloremque dignissimos illo adipisci repellat veniam tempore eum aperiam consectetur! Assumenda, pariatur mollitia? Nostrum beatae debitis magni fuga suscipit inventore, omnis tempore quae ipsam, labore sunt sed. Illum dignissimos voluptatum assumenda molestiae quam perferendis quod ut libero quisquam alias explicabo voluptas at esse temporibus est quia minus, culpa ipsam repellendus cupiditate facilis earum. Natus similique aut aliquam delectus repellat voluptate quae minus porro, voluptates quas eligendi esse nam inventore provident officiis mollitia magni corporis excepturi ipsum quibusdam. Est doloremque quisquam veritatis expedita voluptatibus autem labore blanditiis sequi consectetur. Vitae veniam porro debitis, nam enim nesciunt eveniet, eum labore commodi assumenda perspiciatis accusantium voluptate beatae qui animi a cumque earum similique illum, officiis expedita blanditiis minima repudiandae. Iusto veritatis eligendi odio, aut ad doloribus. Facilis ullam numquam laudantium neque, rem perspiciatis natus sed deleniti, ipsum qui sunt distinctio eum enim explicabo corrupti atque mollitia earum quam nesciunt reiciendis quas illo ipsa error? Nostrum maiores neque consequuntur ipsa sint molestiae provident officia modi. Libero reprehenderit reiciendis assumenda, minus atque deleniti vel eaque tempora vero odit ut asperiores quae! Repellendus mollitia et ipsa maxime quis. Id quibusdam mollitia, ab rem ipsam hic maiores! Porro neque consectetur sed hic, adipisci, provident molestiae nulla architecto, unde fuga dignissimos eligendi quaerat laboriosam praesentium repellendus quis fugiat commodi suscipit cumque impedit necessitatibus facilis. Officiis provident unde laboriosam error placeat aspernatur quam numquam velit nemo explicabo corporis illo soluta ab vero, qui rerum labore pariatur eligendi earum mollitia, eius dolore aperiam. Nihil temporibus nobis deleniti animi mollitia quas delectus quia recusandae vero laboriosam neque cupiditate consequatur incidunt optio a rem perferendis expedita sint est obcaecati, minus dolorem placeat id distinctio? Repellat consectetur minus porro esse voluptatem ullam. Unde molestiae quaerat saepe corrupti tempora labore porro nesciunt, ad ea temporibus reprehenderit magnam accusamus officiis molestias iure placeat et aliquam nihil in maxime rerum vero quisquam. Animi debitis natus doloremque similique aliquam totam ullam, iusto quibusdam, numquam enim tempora. Et corrupti placeat delectus explicabo, consequuntur architecto deleniti repellendus odio quasi optio ratione necessitatibus commodi doloremque tempora cupiditate, ex deserunt error laborum impedit, ipsa iusto! Rerum pariatur nam corporis, molestias consequuntur amet porro consequatur vero autem culpa dolor animi impedit. Corrupti, asperiores labore ex facere doloremque delectus dignissimos ullam! Commodi repellendus quae asperiores minus repellat nesciunt at placeat eum voluptate! Sint autem a sit ab non et error quia nemo, veritatis dicta, itaque totam? Deleniti quidem corporis saepe tempore nobis facere? Magnam officiis placeat corporis, obcaecati culpa ullam nesciunt. Possimus natus ullam nihil adipisci nulla mollitia officia officiis corporis porro recusandae saepe molestias quam voluptas repellendus ratione, sapiente amet ipsam ad tempora. Vel animi facere quod quam deserunt doloremque corrupti consequuntur dolore dolores officiis tempore delectus esse nesciunt, magnam perspiciatis aliquam ratione praesentium optio aperiam sit? Reiciendis quia sapiente ea reprehenderit porro fugiat eaque ipsum illum cupiditate natus. Dolor totam culpa ex tempore harum, molestias iure non ab repudiandae nesciunt laboriosam aperiam doloribus voluptatem, illum repellendus at? Veniam deserunt aliquam quaerat corporis dolores asperiores consectetur id labore, quis ab officiis porro libero aut. Animi dicta itaque expedita maxime aperiam, saepe rerum labore soluta consectetur recusandae delectus quam facere laborum! Quibusdam earum error similique repudiandae laudantium inventore sunt amet, facilis vero magni. Ab nemo doloremque odio consequuntur, et dolores itaque ratione ducimus adipisci asperiores nisi quisquam ea accusantium odit accusamus ut error tempora omnis voluptates minima, in facere nobis officia repellendus. Tempore deserunt dicta quam ut iure, quaerat maiores dolores quis officiis iste ipsam nam sapiente, corporis quibusdam dolorem accusamus, unde possimus rerum beatae itaque perferendis aperiam enim! Quos voluptatibus, dicta vel atque numquam at sint nisi alias dolorum nesciunt beatae enim laudantium, voluptatem voluptas? Molestiae eligendi voluptatem quod sequi laboriosam eaque asperiores repellendus possimus officiis quasi distinctio, dolore iste voluptas nulla earum obcaecati, aliquid accusamus sit? Consequatur nobis molestias sequi maiores voluptas fuga voluptatem architecto totam! Earum suscipit tempore, laboriosam sunt unde voluptates, laborum tempora quis blanditiis delectus fugiat ducimus dolorem obcaecati deleniti id? Provident tenetur quia architecto debitis facere iste pariatur iure, voluptas quaerat eum illo vero fuga, est at ipsum eligendi omnis molestiae assumenda rem dicta. Necessitatibus magnam et officiis molestias cupiditate quod eum, quae alias nisi ad? Ut optio autem sequi omnis voluptas laboriosam tempora, adipisci, praesentium minus delectus rerum earum non iusto molestiae cum mollitia excepturi culpa nesciunt minima! Voluptatem, et temporibus quos aliquid, dolor eaque cupiditate necessitatibus illum itaque vero accusantium neque quia placeat adipisci explicabo hic quae deserunt labore officiis nemo veniam. Incidunt dolore, maxime eligendi nobis, iste deserunt itaque voluptatum similique delectus quia, vitae accusantium iusto. Fugit, quos asperiores quasi quibusdam dicta aut ipsa doloribus sunt reiciendis natus sit atque! Eius veritatis quae nulla, earum in qui. Numquam doloribus quidem libero vero voluptatem repudiandae in maxime voluptas cum error eligendi, voluptates et magnam nostrum dolorum distinctio nobis aperiam facilis ut id impedit. Voluptatem facere atque reiciendis sapiente voluptate consectetur alias, soluta autem numquam? Repellat blanditiis temporibus id natus in ipsa! Ducimus eveniet repudiandae non nulla repellat eligendi! Consequuntur repellat illum atque repudiandae quo quidem eum minima in molestias placeat quia at qui debitis, quam, fugiat officia rem ullam. Dolor natus quas exercitationem pariatur repellat. Tempore animi beatae delectus fuga sequi mollitia odio commodi nihil dolore? Cum rem, quaerat unde atque voluptate quas labore. Quaerat expedita aliquam, facere accusantium officiis cum cumque pariatur veniam, assumenda ducimus quo neque molestiae! Quae maxime quasi ipsa explicabo nihil, vel accusamus. Laboriosam veritatis similique illo vero dignissimos inventore possimus commodi tempore. Consequuntur libero voluptatum accusantium natus nihil earum et, omnis atque consectetur error quo ratione totam quam sed, magnam reiciendis repellendus laborum non quidem facilis deleniti assumenda minus tempora. Placeat, itaque suscipit a impedit laborum nobis, perferendis odit assumenda natus doloribus ullam sequi inventore! Officia mollitia maxime rem suscipit exercitationem deleniti neque, provident doloribus nemo assumenda molestias sequi! Hic, animi. Voluptatum quos quae omnis cum sequi deleniti nesciunt illo error adipisci. Ipsa voluptatem quas officia vitae alias labore doloremque, error consectetur laudantium? Rem dolores libero mollitia, quibusdam ducimus architecto, id ea earum, sapiente excepturi placeat eaque alias. Voluptatem quo placeat architecto, saepe deleniti velit atque voluptates laborum alias dicta. Id dolores neque, doloribus est voluptatibus earum porro reprehenderit molestiae tempore alias! Dolores eum fugiat, consequuntur veritatis adipisci at optio deserunt sapiente blanditiis! Nam praesentium deleniti accusantium perspiciatis tempore ducimus consequatur numquam corrupti, excepturi qui architecto ad itaque necessitatibus modi unde fuga nobis expedita minus magni quo. Ullam ipsum fugiat eum nemo. Magnam nobis ipsum veniam similique magni itaque quidem dolore beatae incidunt molestias. Quod, blanditiis. Facilis quod ex ea? Quidem dolorum tempore nesciunt laudantium natus. Debitis necessitatibus ipsum excepturi delectus sunt, quasi voluptatem blanditiis, nihil omnis, laborum illum autem doloremque veniam voluptates officia ea. Alias illo reprehenderit, vitae, voluptates quae pariatur possimus ut modi aspernatur voluptas quis ullam dolorum sit dicta neque repellendus expedita quisquam, maiores beatae porro nisi. Dolores itaque aspernatur suscipit totam laudantium repudiandae aut? Eligendi commodi nobis sint, suscipit, dignissimos repellat, facere architecto quod corporis officiis tenetur! Labore veritatis nam excepturi, molestiae odio consequatur dignissimos non, vitae laboriosam dolorum dolorem amet, perspiciatis quam? Cum nemo, nobis praesentium quia sed veniam dolorum deleniti officia? Qui veritatis quos exercitationem cum, accusantium expedita, sit omnis ut, nesciunt excepturi earum. Autem doloremque natus nobis accusamus, maxime rem libero labore fugit architecto consectetur, voluptas, recusandae mollitia similique enim aliquam ipsum veniam sunt laboriosam. Tenetur quibusdam accusamus minus ipsam corrupti! Vero, ipsa libero! Sunt provident minus officia ipsum enim dicta consequuntur ab deleniti aliquam porro quisquam, mollitia ullam distinctio consectetur saepe soluta eligendi nobis, quas eum facilis molestiae? Dignissimos, magnam, ut aliquid, laudantium perferendis nihil incidunt voluptates reprehenderit ex repellendus explicabo? Quasi veniam provident alias aspernatur nisi, corrupti id similique necessitatibus neque, ullam, maxime libero vitae sit deleniti repellendus voluptatum tempore ut. Voluptatem nulla repellat eius quidem, praesentium sapiente, id cupiditate saepe neque rerum rem laboriosam. Commodi consequatur fugiat explicabo voluptates sint sapiente excepturi repellendus quas placeat dolore vero magni quaerat aut veritatis quisquam assumenda, nostrum unde architecto doloremque molestiae vel accusamus. Maxime nam deleniti eligendi placeat suscipit fuga quis quo atque, cumque autem cupiditate officiis aperiam tempora reiciendis sunt quasi rerum praesentium et aspernatur non blanditiis necessitatibus quam culpa sed. Excepturi, rem.
		</ScrollShadow>
      </div>

      <div className="relative w-full lg:w-1/3 p-4 border-l-2 border-stroke">
		<button
			type="button"
			className="static lg:absolute z-10 -left-[2.6rem] rounded-l-lg rounded-r-none px-3 py-2 bg-white border border-r-0"
			onClick={() => console.log("log")}
		>
			<MdChevronLeft className="w-4 h-4" />
		</button>
        <ScrollShadow hideScrollBar className="w-full h-full">
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
