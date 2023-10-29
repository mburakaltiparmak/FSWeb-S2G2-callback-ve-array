const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

const final2014 = fifaData.filter((match) => {
  return match.Year === 2014 && match.Stage === "Final";
});

console.log(final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]);
if (final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]) {
  console.log(`Kazanan ${final2014[0]["Home Team Name"]}`);
} else {
  console.log(`Kazanan ${final2014[0]["Away Team Name"]}`);
}
const uzayanFinaller = fifaData.filter((match) => {
  return (
    match.Stage === "Final" &&
    match["Home Team Goals"] === match["Away Team Goals"]
  );
});

//console.log(uzayanFinaller.length);
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
  return arr.filter((match) => match.Stage === "Final");
}

/*  Görev 3: 
	Bir higher-order(BİR FONKSİYONU PARAMETRE OLARAK ALAN FONKSİYONLAR) fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
  const years = Finaller(fifaData).map((match) => {
    return match["Year"];
  });
  return years;
}
//console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, Finaller) {
  // const Kazananlar = Finaller(fifaData).reduce((acc, match) => {
  //	if(match['Home Team Goals'] > match['Away Team Goals']){
  //		acc.push(match['Home Team Name']);
  //	}
  //		else {
  //		acc.push(match['Away Team Name'])
  //	}
  //	return acc;
  //
  //	},[])
  //	return Kazananlar;
  const Kazananlar = Finaller(fifaData).map((match) => {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      return match["Home Team Name"];
    } else {
      return match["Away Team Name"];
    }
  });
  return Kazananlar;
}
//console.log(Kazananlar(fifaData,Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
  const yillar = Yillar(fifaData, Finaller);
  const kazananlar = Kazananlar(fifaData, Finaller);
  const result = [];
  yillar.forEach((yil, index) => {
    const metin = `${yil} yılında, ${kazananlar[index]} dünya kupasını kazandı!`;
    result.push(metin);
  });
  return result;
}
//console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  let toplamGolSayisi = Finaller.reduce(
    (ToplamGol, match) =>
      ToplamGol + match["Home Team Goals"] + match["Away Team Goals"],
    0
  );

  return (toplamGolSayisi / Finaller.length).toFixed(2);
}

console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(fifaData, Finaller) {
  const goller = Finaller(fifaData).reduce((total, mac) => {
    if (total[mac["Home Team Initials"]] == undefined) {
      total[mac["Home Team Initials"]] = mac["Home Team Goals"];
    } else {
      total[mac["Home Team Initials"]] += mac["Home Team Goals"];
    }
    if (total[mac["Away Team Initials"]] == undefined) {
      total[mac["Away Team Initials"]] = mac["Away Team Goals"];
    } else {
      total[mac["Away Team Initials"]] += mac["Away Team Goals"];
    }
    return total;
  }, {});

  let max = 0;
  let team = " ";
  for (let team in goller) {
    if (goller[team] > max) {
      max = goller[team];
      EnCokGolAtan = team;
    }
  }

  return `En cok gol atan takim ${max} golle ${EnCokGolAtan} .`;
}
console.log(EnCokGolAtan(fifaData, Finaller));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(fifaData, Finaller) {
  const goller = Finaller(fifaData).reduce((total, mac) => {
    if (total[mac["Home Team Initials"]] == undefined) {
      total[mac["Home Team Initials"]] = mac["Away Team Goals"];
    } else {
      total[mac["Home Team Initials"]] += mac["Away Team Goals"];
    }
    if (total[mac["Away Team Initials"]] == undefined) {
      total[mac["Away Team Initials"]] = mac["Home Team Goals"];
    } else {
      total[mac["Away Team Initials"]] += mac["Home Team Goals"];
    }
    return total;
  }, {});
  let max = 0;
  let EnCokGolYiyen = " ";
  for (let team in goller) {
    if (goller[team] > max) {
      max = goller[team];
      EnCokGolYiyen = team;
    }
  }

  return `En cok gol yiyen takim ${max} golle ${EnCokGolYiyen} .`;
}
console.log(EnKotuDefans(fifaData, Finaller));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
