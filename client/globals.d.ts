// Create a type for the roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  interface TourFields {
    id: number;
    title: string;
    description: string;
    price: number;
    comparePrice: number;
    images: string[];
    city: string;
    state: string;
    country: string;
    status: "ACTIVE" | "DRAFT";
  }
  interface AgentFields {
    id: number;
    name: string;
    email: string;
  }
}
