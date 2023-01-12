import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material";
import person1 from "../../public/assets/person/1.jpeg"
import Image from "next/image";


export default function Share() {
  return (
    <div className="md:min-w-min rounded-xl shadow-lg">
      <div className="p-3">
        <div className="flex items-center">
          <Image className="w-14 h-14 rounded-full object-cover mr-3" src={person1} alt="Jame Rajput" />
          <input
            placeholder="What's in your mind Safak?"
            className="border-none focus:outline-none w-4/5 "
          />
        </div>
        <hr className="m-5"/>
        <div className="md:flex md:justify-around">
            <div className="flex  mr-5">
                <div className="flex items-center mr-5 cursor-pointer">
                    <PermMedia htmlColor="tomato" sx={{ fontSize: 20 }} className="mr-1"/>
                    <span className="font-medium font-roboto text-sm">Photo & Video</span>
                </div>
                <div className="flex items-center mr-5 cursor-pointer">
                    <Label htmlColor="blue" sx={{ fontSize: 20 }} className="mr-1"/>
                    <span className="font-medium font-roboto text-sm">Tag</span>
                </div>
                <div className="flex items-center mr-5 cursor-pointer">
                    <Room htmlColor="green" sx={{ fontSize: 20 }} className="mr-1"/>
                    <span className="font-medium font-roboto text-sm">Location</span>
                </div>
                <div className="flex items-center mr-5 cursor-pointer">
                    <EmojiEmotions htmlColor="goldenrod" sx={{ fontSize: 20 }} className="mr-1"/>
                    <span className="font-medium font-roboto text-sm">Feelings</span>
                </div>
            </div>
            <button className="ml-64 md:ml-0 border-none py-2 px-3 mt-1 rounded-md bg-green-600 font-medium mr-5 cursor-pointer text-white">Share</button>
        </div>
      </div>
    </div>
  );
}