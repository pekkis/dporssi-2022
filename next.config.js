/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["images.ctfassets.net"]
  },

  async redirects() {
    return [
      {
        source: "/valeuutiset",
        destination: "/valeuutiset/sivu/1",
        permanent: true
      },
      {
        source: "/diktaattorit",
        destination: "/diktaattorit/sivu/1",
        permanent: true
      },
      {
        source: "/k%C3%A4ytt%C3%B6ehdot",
        destination: "/kayttoehdot",
        permanent: true
      },
      {
        source: "/tietoa-p%C3%B6rssist%C3%A4",
        destination: "/tietoa-porssista",
        permanent: true
      },
      {
        source: "/ota-yhteytt%C3%A4",
        destination: "/ota-yhteytta",
        permanent: true
      },
      {
        source: "/propaganda",
        destination: "/valeuutiset",
        permanent: true
      },
      {
        source: "/propaganda",
        destination: "/valeuutiset",
        permanent: true
      },
      {
        source: "/propaganda/:slug*",
        destination: "/valeuutiset/:slug*",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu",
        destination: "/luokittelu",
        permanent: true
      },
      {
        source: "/luokittelu/rasisti",
        destination: "/luokittelu/kiusaaja",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/anti-%C3%A4lymyst%C3%B6",
        destination: "/luokittelu/anti-alymysto",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/m%C3%A4t%C3%A4",
        destination: "/luokittelu/mata",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/henkil%C3%B6kultti",
        destination: "/luokittelu/henkilokultti",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/p%C3%A4%C3%A4tyi%20maanpakoon",
        destination: "/luokittelu/paatyi-maanpakoon",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/p%C3%A4%C3%A4tyi%20vankilaan",
        destination: "/luokittelu/paatyi-vankilaan",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/tuomittiin%20kuolemaan",
        destination: "/luokittelu/tuomittiin-kuolemaan",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/pojasta%20polvi%20paranee",
        destination: "/luokittelu/pojasta-polvi-paranee",
        permanent: true
      },
      {
        source: "/diktaattorit/luokittelu/:slug",
        destination: "/luokittelu/:slug",
        permanent: true
      },
      {
        source: "/diktaattori/teodoro-obiang",
        destination: "/diktaattori/teodoro-obiang-nguema-mbasogo",
        permanent: true
      },
      {
        source: "/diktaattori/macias-nguema",
        destination: "/diktaattori/francisco-macias-nguema",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
