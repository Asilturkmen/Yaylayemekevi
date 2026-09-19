import { Leaf, Heart, Users } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { site } from "../config/site";
import { t, fill } from "../i18n";

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-baslik"
      className="py-16 sm:py-20 bg-green-50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="about-baslik" className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {fill(t.about.intro, { name: site.name })}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {fill(t.about.ownerNote, { owner: site.owner })}
            </p>

            <div className="space-y-6">
              {t.about.features.map(({ title, description }, index) => {
                const Icon = [Leaf, Heart, Users][index];
                return (
                  <div key={title} className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full shrink-0">
                      <Icon className="w-6 h-6 text-green-700" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">{title}</h3>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <ResponsiveImage
              name="hakkimizda"
              alt={t.about.imageAlt}
              sizes="(min-width: 1024px) 552px, calc(100vw - 2rem)"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-green-900 font-semibold text-sm">
                {fill(t.about.badgeSince, { year: site.foundingYear })}
              </p>
              <p className="text-gray-600 text-sm">{t.about.badgeServing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
