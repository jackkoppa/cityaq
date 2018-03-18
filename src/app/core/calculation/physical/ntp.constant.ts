// https://www3.epa.gov/ttnamti1/files/ambient/inorganic/mthd-2-4.pdf
// https://www.engineeringtoolbox.com/stp-standard-ntp-normal-air-d_772.html

// Note: currently, when converting convert between density & ppm/ppb by volume, we are assuming a single temperature & pressure
// (in NTP, this is 20 degrees Celsius & 1 atm)
// This guarantees some inaccuracy in our conversions, given that temperature especially will vary between collection points
// To fix that inaccuracy, however, we would have to call a 3rd-party service to retrieve temp & pressure data
// Since OpenAQ doesn't include this in measurements. 
// Given that limitation, NTP (20 C) is closer to worldwide average temp than STP (0 C);
// that & its usage by US EPA is why NTP is chosen here

export const NTP = {
    temperatureInK: 293.15,
    pressureInAtm: 1,
    gasConstantForKAndAtm: 8.2057338e-5
}