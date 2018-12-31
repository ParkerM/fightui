export class Fight {
  public eventDate: string;
  public eventOrg: string;
  public eventName: string;
  public eventBout: string;
  public eventBilling: string;
  public geoCountry: string;
  public geoRegion: string;
  public geoVenue: string;
  public geoVenueLocation: string;

  public constructor(init?: Partial<Fight>) {
    Object.assign(this, init);
  }
}
