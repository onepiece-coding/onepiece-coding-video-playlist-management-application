import avatar from "../assets/avatar.svg";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Profil</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img src={avatar} alt="Profile" className="h-16 w-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Said GAHI</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Développeur Full Stack
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-semibold dark:text-white">Email:</h3>
            <p className="dark:text-gray-300">contact@saidgahi.com</p>
          </div>
          <div>
            <h3 className="font-semibold dark:text-white">Localisation:</h3>
            <p className="dark:text-gray-300">Ouarzazate, Maroc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
