import {Fight} from './fight.model';

describe('FightModel', () => {
  it('constructs partial Fight object', () => {
    const fightData = {
      eventDate: 1552752000000,
      eventUrlPath: '/place/events/57340-aca-93-st-petersburg',
    };

    const fight = new Fight(fightData);

    expect(fight.eventDate).toEqual(1552752000000);
    expect(fight.eventUrlPath).toEqual('/place/events/57340-aca-93-st-petersburg');
  });

  it('constructs all fields', () => {
    const fightData = {
      _id: '5c29cdd760d894000d54e678',
      _timestamp: 1546243543,
      eventBilling: 'Main Card',
      eventBout: 'Balaev vs. Zhamaldaev',
      eventDate: 1552752000000,
      eventName: 'ACA 93',
      eventOrg: 'ACA',
      eventUrlPath: '/place/events/57340-aca-93-st-petersburg',
      geoCountry: 'Ru',
      geoRegion: 'Russia Region',
      geoVenue: 'Sibur Arena',
      geoVenueLocation: 'St. Petersburg, Russia',
    };

    const fight = new Fight(fightData);

    expect(fight._id).toEqual('5c29cdd760d894000d54e678');
    expect(fight._timestamp).toEqual(1546243543);
    expect(fight.eventBilling).toEqual('Main Card');
    expect(fight.eventBout).toEqual('Balaev vs. Zhamaldaev');
    expect(fight.eventDate).toEqual(1552752000000);
    expect(fight.eventName).toEqual('ACA 93');
    expect(fight.eventOrg).toEqual('ACA');
    expect(fight.eventUrlPath).toEqual('/place/events/57340-aca-93-st-petersburg');
    expect(fight.geoCountry).toEqual('Ru');
    expect(fight.geoRegion).toEqual('Russia Region');
    expect(fight.geoVenue).toEqual('Sibur Arena');
    expect(fight.geoVenueLocation).toEqual('St. Petersburg, Russia');
  });
});
