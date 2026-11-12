/**
 * A brand icon rendered in the hero's floating technology stack.
 * Only serializable data is passed from the server component to the client.
 */
export interface HeroTechnology {
  name: string;
  path: string;
  iconClassName: string;
}
