import Image from "next/legacy/image";

export default function ProfileInfo() {
  return (
    <div className="md:ml-64">
      <div className="">
        <div className="h-80">
          <div className="relative w-full h-64">
            <Image
              className="object-cover"
              src="/assets/post/3.jpeg"
              layout="fill"
              objectFit="cover"
              alt="coverImage"
            />
          </div>
          <div className="relative w-36 h-36 m-auto -top-24 rounded-full border-2 border-solid border-white ">
            <Image
              className=" rounded-full absolute left-0 right-0"
              src="/assets/person/7.jpeg"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl">Safak Kocaoglu</h4>
          <span className="font-light">Hello my friends!</span>
        </div>
      </div>
    </div>
  );
}
