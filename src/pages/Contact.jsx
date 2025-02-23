import { assets } from "@/assets/assets";
import NewsletterBox from "@/components/NewsletterBox";
import Title from "@/components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-[#034694]">
            The Stadium Megastore Opening Hours
          </p>
          <p className="text-gray-500">Monday - Friday: 10am - 5.30pm</p>
          <p className="text-gray-500">Saturday: 10am - 5.30pm</p>
          <p className="text-gray-500">Sunday: 11am - 5pm</p>
          <p className="text-gray-500">Stadium Megastore: 10am - 10.30pm</p>
          <p className="text-gray-500">Stamford Gate Store: 5pm - 10.30pm</p>

          <p className="font-semibold text-xl text-[#034694]">Getting To Us</p>
          <p className="text-gray-500">
            The closest underground station to Stamford Bridge is Fulham
            Broadway. After exiting Fulham Broadway station, turn left onto
            Fulham Road.
          </p>
          <p className="text-gray-500">
            Telephone: 0371 811 1955 (International +44 203 386 9373)
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};
export default Contact;
