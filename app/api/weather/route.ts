// app/api/weather/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'

interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

interface WeatherResponse {
    location: Location;
    current: Current;
}

export async function GET() {
    try {
        const headersList = headers();
        const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
        console.log(`api ${ip}`)
        const API_KEY = process.env.WEATHER_API_KEY

        if (!API_KEY) {
            throw new Error(`Weather API Key not provided!`);
        }
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ip}&aqi=no`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 300
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Weather API responded with status: ${response.status}`);
        }

        const data: WeatherResponse = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Weather API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}