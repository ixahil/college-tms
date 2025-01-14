// Create a type for the roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  interface TourFields {
    id: string; // MongoDB usually uses a string as the ObjectId
    title: string;
    description: string;
    price: number;
    comparePrice: number;
    images: string[];
    city: string;
    state: string;
    country: string;
    status: "ACTIVE" | "DRAFT";
    itinerary: {
      title: string;
      description: string;
    }[];
    groupSize?: string;
    departureDate?: string;
    duration?: string;
  }

  interface AgentFields {
    id: string; // MongoDB usually uses a string as the ObjectId
    name: string;
    email: string;
  }

  interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }

  interface TourResponse {
    status: "Success" | "Error";
    message: "Success" | "Error";
    statusCode: number;
    data: {
      tours: TourFields[];
      pagination: Pagination;
    };
  }
}
