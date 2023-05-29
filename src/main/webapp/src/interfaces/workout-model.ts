export interface IWorkout {
    id: number;
    name: string | null;
    description: string | null;
    heating: number | null;
    highIntensityTime: number | null;
    restTime: number | null;
    repetitions: number | null;
    slug: string | null;
    createdAt: string;
    updatedAt: string | null;
}