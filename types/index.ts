export interface SpyCat {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export interface CreateSpyCatDto {
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export interface UpdateSpyCatDto {
  salary: number;
}

export interface ApiError {
  message: string;
  detail?: string;
}

