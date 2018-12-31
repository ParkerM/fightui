export class Fight {
  _id: string;
  _timestamp: number;
  eventBilling: string;
  eventBout: string;
  eventDate: number;
  eventName: string;
  eventOrg: string;
  eventUrlPath: string;
  geoCountry: string;
  geoRegion: string;
  geoVenue: string;
  geoVenueLocation: string;

  public constructor(init?: Partial<Fight>) {
    Object.assign(this, init);
  }
}
