import astropy.units as u
from astropy.coordinates import AltAz, EarthLocation, SkyCoord, Angle
from astropy.time import Time

import random


def calculate_altitude(star):
    # placeholder implementation of calculate_altitude function
    # returns a random altitude value between 0 and 90 degrees
    bear_mountain = EarthLocation(lat=41.3*u.deg, lon=-74*u.deg, height=390*u.m) # type: ignore
    utcoffset = -4*u.hour  # type: ignore # Eastern Daylight Time
    time = Time('2023-07-02 23:00:00') - utcoffset

    coord = SkyCoord(ra=star.ra, dec=star.dec, unit=(u.hourangle, u.deg)) # type: ignore
    target = coord.transform_to(AltAz(obstime=time,location=bear_mountain))
    deg = float(target.alt.degree) # type: ignore
    return deg

def get_altitude(stars):
    # this function takes in a list of stars and returns the same list with an additional "altitude" field for each star
    for star in stars.items:
        star.altitude = round(float(calculate_altitude(star)), 2)
    return stars