import { Star, Quote } from "lucide-react";
import { site } from "../config/site";
import { t } from "../i18n";

const Reviews = () => {
  const reviews = [
    {
      name: "Arda Günsüren",
      rating: 5,
      comment:
        "Her şey mükemmeldi, iskeleye yolunuz düştüyse (düşmese bile düşürün) kesinlikle uğramanız gereken bir mekan. Anne eli değmiş lezzetli yemeklerini, taptaze salatasını yemeden dönmeyin. Çayın yanında verdikleri ikram için de ek olarak teşekkür ederiz 🙏🙏",
    },
    {
      name: "Robert Turcan",
      rating: 5,
      comment:
        "Mükemmel yemekler, büyük porsiyonlar ve harika ve nazik bir servis. Sahibi, sizi eski bir dost gibi karşılayan inanılmaz derecede sıcak bir insandır. Sipariş edilen yemeklerin yanında çay, meyve, ev yapımı patates ve aile ortamı hediye edildi. Tereddüt etmeyin ve mutlaka uğrayın.",
    },
    {
      name: "Sinan dişçioğlu",
      rating: 5,
      comment:
        "Mercimek çorba, tavuk çorba ev usulü (annem babam usulü) bütün rahiyasini damağınızda hissedeceğiniz tadda ve lezzette. Gece de çorba bulabilirsiniz, Köfte yine annem babam usulü, tavuk ızgara ve sinitzel de lezzetli. Cavit Bey gelenleri müşteri gibi değil misafiri gibi karsiliyor, ikramda bulunuyor ve tabiri caizse evde O pisirilenlenlerden ikram edip uğurluyor. En kisa kahvaltı içinde gideceğiz.",
    },
    {
      name: "Mario Meissner",
      rating: 5,
      comment:
        "Harika yemekler ve olağanüstü konukseverlik! Gizli bir mücevher ve geleneksel Kuzey Kıbrıs mutfağını deneyimlemek isteyen herkese şiddetle tavsiye edilir. Sahibi bize rakipsiz bir fiyata değerli müşteriler olarak davrandı. Taze organik incir ve elmanın yanı sıra ücretsiz çay aldık. Çocuklarımız da çok sevdi. Kesinlikle geri döneceğim. Saygılarımla Mario.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-baslik"
      className="py-16 sm:py-20 bg-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="reviews-baslik" className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            {t.reviews.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">{renderStars(5)}</div>
            <span className="text-lg font-semibold text-green-900">5.0</span>
            <span className="text-gray-600">{t.reviews.googleReviews}</span>
          </div>
          {/* Yorumlar misafirlerin kendi sozleri; cevrilmez. TR'de not bos birakilir. */}
          {t.reviews.languageNote && (
            <p className="text-sm text-gray-500">{t.reviews.languageNote}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-green-200" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t.reviews.shareYours}</p>
          <a
            href={site.maps.place}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full transition-colors duration-300"
          >
            <span>{t.reviews.writeReview}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
