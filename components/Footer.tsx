import Link from 'next/link';
import { Activity, Mail, Phone, MapPin, Instagram } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight">Dr. Sumedh Magar</span>
                <span className="text-sm text-neutral-300">Sports Orthopedic Surgeon</span>
              </div>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              M.S. ORTHOPAEDICS, Masters in Sports Medicine (UCL, UK), Fellowship in Arthroscopy &amp;
              Adult Reconstructive Surgery (ISAKOS)
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/expertise', label: 'Clinical Expertise' },
                { href: '/treatments', label: 'Treatments' },
                { href: '/sports-injuries', label: 'Sports Injuries' },
                { href: '/blog', label: 'Blog' },
                { href: '/research', label: 'Research' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-300 hover:text-primary transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Treatments</h3>
            <ul className="space-y-2">
              {[
                { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Tear' },
                { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                { href: '/treatments/shoulder-arthroscopy-pune', label: 'Shoulder Arthroscopy' },
                { href: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
                { href: '/treatments/sports-rehabilitation-pune', label: 'Sports Rehab' },
                { href: '/orthopedic-surgeon-pune', label: 'Orthopedic Surgeon Pune' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-300 hover:text-primary transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-neutral-300 text-sm">
                  Shp 9-13 UPPER GROUND FLOOR, Madhukosh Society, Balewadi, Pune 411045
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919145517171" className="text-neutral-300 hover:text-primary transition-colors text-sm">
                  9145517171 / 02067813869
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:sumedh@isportmedicalcentre.com"
                  className="text-neutral-300 hover:text-primary transition-colors text-sm"
                >
                  sumedh@isportmedicalcentre.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <ul className="space-y-1">
                {[
                  { href: '/privacy-policy', label: 'Privacy Policy' },
                  { href: '/terms-conditions', label: 'Terms & Conditions' },
                  { href: '/medical-disclaimer', label: 'Medical Disclaimer' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-neutral-400 hover:text-primary transition-colors text-xs">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/isport_pune/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-neutral-300">
                <strong>Clinic Hours:</strong>
                <br />
                Mon - Sat: 9:00 AM - 6:00 PM
                <br />
                Sunday: By Appointment
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-600 mt-12 pt-8 text-center">
          <p className="text-neutral-300 text-sm">
            &copy; {currentYear} Dr. Sumedh Magar. All rights reserved. | I-SPORT MEDICAL CENTRE
          </p>
        </div>
      </div>
    </footer>
  );
};
