import { truncateText } from "@/utils";
import { headers } from "next/headers";

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: WeatherCondition;
  };
}

async function getWeather() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/weather`,
      {
        headers: headers(),
      },
    );
    if (!response.ok) throw new Error("Failed to fetch weather");
    return response.json();
  } catch (error) {
    return error;
  }
} 

export async function WeatherWidget() {
  const weatherData: WeatherResponse | null = await getWeather();

  if (!weatherData) return <> {JSON.stringify(weatherData)} </>;

  const cityName = truncateText(weatherData.location.name, 15);
  const location = `${cityName}, ${weatherData.location.country}`;
  const weatherCondition = truncateText(weatherData.current.condition.text, 20);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-r from-blue-300 to-blue-800 p-6 backdrop-blur-lg">
      <div className="absolute inset-0 overflow-hidden">
        {weatherData.current.condition.text.toLowerCase().includes("cloud") && (
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${i * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div className="h-8 w-16 rounded-full bg-white/5" />
                <div className="-mt-4 ml-4 h-10 w-20 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-white md:text-xl ">
            {location}
          </span>
          <span className="text-sm text-white/90 md:text-base">
            {weatherCondition}
          </span>
        </div>
        <div className="text-3xl font-light tracking-tighter text-white md:text-5xl">
          {weatherData.current.temp_c}°C
        </div>
      </div>
    </div>
  );
}
