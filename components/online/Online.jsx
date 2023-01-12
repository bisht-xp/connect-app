export default function Online({user}) {
    return (
      <li className="flex items-center mb-4">
        <div className="mr-3 relative">
          <img className="w-10 h-10 rounded-full object-cover" src={user.profilePicture} alt="" />
          <span className="w-3 h-3 rounded-full bg-lime-600 absolute -top-1 right-0 border-2"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    );
  }