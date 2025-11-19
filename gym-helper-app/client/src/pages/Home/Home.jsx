import { useAuth, unknownUser } from "../../contexts/theme/AuthContext";

export default function Home() {

  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name ?? unknownUser.name}!</h1>

      {/* workout card */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-center">
          Today's Workout: [Workout Title]
        </h2>
        <button className="w-full bg-white text-white py-2 rounded font-semibold text-xl">
          START WORKOUT
        </button>
      </div>

      {/* weekly activity card */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded shadow-md p-6 w-full max-h-full ">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Weekly Activity
        </h2>
        <div className="flex justify-between mt-4 mb-2">
          {/* for each day, add a bar */}
          {["S", "S", "M", "T", "W", "Th", "F"].map((d, x) => (
            <div key={x} className="flex flex-col items-center">
              <h6 className="mt-2 text-sm">{d}</h6>
              <div
                className="w-6 bg-blue-400 rounded"
                style={{ height: `${Math.min((100 * Math.random() + 10), 100)}px` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* calories and nutrition */}
      <div className="flex flex-row gap-8 w-full">

        {/* calories card */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded shadow p-6 space-y-2 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
          <div className="text-4xl font-bold mb-2">50%</div>

          <div className="relative flex items-center justify-center h-28 w-28 mb-2">
            {/* circle (will change later, just aesthetics for now) */}
            <div className="absolute inset-0 rounded-full border-8 border-blue-400" />
            <span className="relative z-10 text-center">
              1500
              <br />/ 3000
            </span>
          </div>
        </div>

        {/* nutrition card */}
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded shadow p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
          <div className="text-xs">Carbs 10% | Fat 26% | Protein 50%</div>
          {/* bars for each element in array */}
          <div className="mt-2 mb-2">
            {[
              { name: "Carbs", per: 10 },
              { name: "Fat", per: 26 },
              { name: "Protein", per: 50 },
            ].map((item, idx) => (
              <div key={item.name} className="mb-1">
                <div className="flex justify-between text-xs">
                  <span>{item.name}</span>
                  <span>{item.per}%</span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 rounded h-4 w-full">
                  <div
                    className="bg-purple-500 h-4 rounded"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
