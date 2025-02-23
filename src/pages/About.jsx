import { assets } from "@/assets/assets";
import NewsletterBox from "@/components/NewsletterBox";
import Title from "@/components/Title";

const About = () => {
  return (
    <div>
      <div className="text-4xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="underline text-gray-700">
            Our website is managed by Fanatics (International) Ltd.
          </p>
          <p>
            As the global leader in licensed sports merchandise, Fanatics
            delivers to over 180 countries, runs stores in over 12 languages and
            supports multi-lingual call centres incorporating 11 languages.
            Fanatics extended the reach of its licensed sports merchandise
            business by acquiring UK-based international sports e-commerce
            company, Kitbag on February 2nd, 2016. It now supports and
            compliments Fanatics successful U.S. operation by focusing on
            partnerships with the biggest sporting teams and organisations
            around the world.
          </p>
          <p>
            Operating from its base in the UK's sporting stronghold of
            Manchester, the international business provides online, retail and
            end-to-end event solutions for over 30 partners across various
            sports. Fanatics has relationships with globally recognised English
            Premier League, La Liga, Bundesliga and Ligue 1 clubs, along with
            representation across all major US Sports Leagues, Golf, Rugby, F1,
            esports and Tennis.
          </p>
          <p>
            Internationally, Fanatics also delivers specific global leadership
            in event, city centre and in-venue retail; providing expertise at
            leading soccer, rugby and golfing venues. Fulfilment and service
            infrastructure has also expanded internationally, leveraging the
            historic expertise of Kitbag in international markets and
            integrating with the marketing and technology solutions
            traditionally used by Fanatics across its sites and partners in the
            U.S.
          </p>
          <p>
            The Chelsea Online Megastore at chelseamegastore.com is operated
            under licence by Fanatic
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"CONTACT"} text2={"CHANNELS"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Contacting Us by Chat:</b>
          <p className="text-gray-600">
            To reach one of our Fan Service Athletes by chat, please click on
            the “Chat” bubble at the bottom right corner of your screen
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Contacting Us by Email:</b>
          <p className="text-gray-600">
            We are happy to answer queries on products, orders, and anything
            else about the online store. Please use this link to start an email
            conversation: Email Form We endeavour to respond to all emails
            within 24 hours.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Contacting Us by Phone:</b>
          <p className="text-gray-600">
            If you'd like to speak to one of our friendly advisors, please
            contact us on +44 (0)333 331 2061 - we are available 24 hours a day,
            7 days a week.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};
export default About;
