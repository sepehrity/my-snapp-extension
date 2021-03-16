import type { Coordinate } from './Rides';

interface RowDetail {
  description: string;
  title: string;
  type: string;
}

export interface RideHistoryResponse {
  human_readable_id: string;
  created_at: string;
  destination: Coordinate;
  final_price: number;
  origin: Coordinate;
  rows: RowDetail[];
  title: string;
  updated_at: string;
  vehicle_model: string;
  service_type_name: string;
  has_rated: boolean;
  rate?: number;
}
