import astropy.units as u
from astropy.coordinates import AltAz, EarthLocation, SkyCoord, Angle
from astropy.time import Time

import random


def calculate_altitude(star, location, time):
    """
    Calculate the altitude of a star from a specific location at a specific time.

    Parameters:
    star (SkyCoord): The star for which to calculate the altitude. It should have 'ra' and 'dec' attributes.
    location (EarthLocation): The location from which to calculate the star's altitude.
    time (Time): The time at which to calculate the star's altitude.

    Returns:
    float: The altitude of the star in degrees.
    """
    coord = SkyCoord(ra=star.ra, dec=star.dec, unit=(u.hourangle, u.deg)) # type: ignore
    target = coord.transform_to(AltAz(obstime=time,location=location))
    deg = float(target.alt.degree) # type: ignore
    return deg

def get_altitude(stars, location, time):
    # this function takes in a list of stars and returns the same list with an additional "altitude" field for each star
    for star in stars.items:
        star.altitude = round(float(calculate_altitude(star, location, time)), 2)
    return stars