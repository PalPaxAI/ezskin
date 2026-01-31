// Items được cập nhật - tỉ lệ dựa trên giá so với case (300$)
// Items < 150$: dropPercent 30-90% (theo giá trị - rẻ hơn = cao hơn)
// Items 150$ - 300$: dropPercent 10-30% (bình thường)
// Items ≥ 300$: dropPercent thấp 0.5-5% (khó nhận)
const items2 = {
	item0: {
		weapon: "M4A4",
		name: "M4A4 Mainframe",
		skin: "Mainframe",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/m4a4/mainframe.jpg",
		price: 0.07,
		id: 80,
		dropPercent: 90.00,
	},
	item1: {
		weapon: "MAC-10",
		name: "MAC-10 Candy Apple",
		skin: "Candy Apple",
		color: "light-blue",
		imgDist: "../dist/img/weapons/smgs/mac-10/candy-apple.jpg",
		price: 0.13,
		id: 69,
		dropPercent: 89.97,
	},
	item2: {
		weapon: "M4A4",
		name: "M4A4 Poly Mag",
		skin: "Poly Mag",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/m4a4/poly-mag.jpg",
		price: 0.25,
		id: 79,
		dropPercent: 89.92,
	},
	item3: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Mudder",
		skin: "Mudder",
		color: "light-blue",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/mudder.jpg",
		price: 0.32,
		id: 7,
		dropPercent: 89.89,
	},
	item4: {
		weapon: "MAC-10",
		name: "MAC-10 Light Box",
		skin: "Light Box",
		color: "blue",
		imgDist: "../dist/img/weapons/smgs/mac-10/light-box.jpg",
		price: 0.59,
		id: 62,
		dropPercent: 89.76,
	},
	item5: {
		weapon: "R8 Revolver",
		name: "R8 Revolver Amber Fade",
		skin: "Amber Fade",
		color: "pink",
		imgDist: "../dist/img/weapons/pistols/r8-revolver/amber-fade.jpg",
		price: 0.62,
		id: 40,
		dropPercent: 89.75,
	},
	item6: {
		weapon: "CZ75-Auto",
		name: "CZ75-Auto Tuxedo",
		skin: "Tuxedo",
		color: "blue",
		imgDist: "../dist/img/weapons/pistols/cz75-auto/tuxedo.jpg",
		price: 0.95,
		id: 38,
		dropPercent: 89.60,
	},
	item7: {
		weapon: "AK-47",
		name: "AK-47 Uncharted",
		skin: "Uncharted",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/ak-47/uncharted.jpg",
		price: 1.01,
		id: 59,
		dropPercent: 89.57,
	},
	item8: {
		weapon: "CZ75-Auto",
		name: "CZ75-Auto Jungle Dashed",
		skin: "Jungle Dashed",
		color: "white",
		imgDist: "../dist/img/weapons/pistols/cz75-auto/jungle-dashed.jpg",
		price: 1.24,
		id: 39,
		dropPercent: 89.47,
	},
	item9: {
		weapon: "R8 Revolver",
		name: "R8 Revolver Memento",
		skin: "Memento",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/r8-revolver/memento.jpg",
		price: 1.55,
		id: 43,
		dropPercent: 89.32,
	},
	item10: {
		weapon: "AWP",
		name: "AWP Safari Mesh",
		skin: "Safari Mesh",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/awp/safari-mesh.jpg",
		price: 2.09,
		id: 5,
		dropPercent: 89.08,
	},
	item11: {
		weapon: "AK-47",
		name: "AK-47 Steel Delta",
		skin: "Steel Delta",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/ak-47/steel-delta.jpg",
		price: 2.12,
		id: 58,
		dropPercent: 89.06,
	},
	item12: {
		weapon: "M4A4",
		name: "M4A4 Urban DDPAT",
		skin: "Urban DDPAT",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/m4a4/urban-ddpat.jpg",
		price: 2.15,
		id: 78,
		dropPercent: 89.05,
	},
	item13: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Light Rail",
		skin: "Light Rail",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/light-rail.jpg",
		price: 3.23,
		id: 48,
		dropPercent: 88.56,
	},
	item14: {
		weapon: "R8 Revolver",
		name: "R8 Revolver Phoenix Marker",
		skin: "Phoenix Marker",
		color: "light-blue",
		imgDist: "../dist/img/weapons/pistols/r8-revolver/phoenix-marker.jpg",
		price: 3.66,
		id: 41,
		dropPercent: 88.36,
	},
	item15: {
		weapon: "R8 Revolver",
		name: "R8 Revolver Crimson Web",
		skin: "Crimson Web",
		color: "blue",
		imgDist: "../dist/img/weapons/pistols/r8-revolver/crimson-web.jpg",
		price: 3.77,
		id: 42,
		dropPercent: 88.31,
	},
	item16: {
		weapon: "AK-47",
		name: "AK-47 Elite Build",
		skin: "Elite Build",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/ak-47/elite-build.jpg",
		price: 4.69,
		id: 57,
		dropPercent: 87.89,
	},
	item17: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Naga",
		skin: "Naga",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/naga.jpg",
		price: 5.26,
		id: 47,
		dropPercent: 87.63,
	},
	item18: {
		weapon: "Glock-18",
		name: "Glock-18 Vogue",
		skin: "Vogue",
		color: "pink",
		imgDist: "../dist/img/weapons/pistols/glock-18/vogue.jpg",
		price: 7.12,
		id: 37,
		dropPercent: 86.78,
	},
	item19: {
		weapon: "P2000",
		name: "P2000 Amber Fade",
		skin: "Amber Fade",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/p2000/amber-fade.jpg",
		price: 8.31,
		id: 35,
		dropPercent: 86.24,
	},
	item20: {
		weapon: "AWP",
		name: "AWP Duality",
		skin: "Duality",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/awp/duality.jpg",
		price: 9.22,
		id: 21,
		dropPercent: 85.83,
	},
	item21: {
		weapon: "AK-47",
		name: "AK-47 Slate",
		skin: "Slate",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/ak-47/slate.jpg",
		price: 10.61,
		id: 3,
		dropPercent: 85.19,
	},
	item22: {
		weapon: "AWP",
		name: "AWP Atheris",
		skin: "Atheris",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/awp/atheris.jpg",
		price: 10.9,
		id: 87,
		dropPercent: 85.06,
	},
	item23: {
		weapon: "FAMAS",
		name: "FAMAS Commemoration",
		skin: "Commemoration",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/famas/commemoration.jpg",
		price: 12.05,
		id: 68,
		dropPercent: 84.54,
	},
	item24: {
		weapon: "M4A4",
		name: "M4A4 Spider Lily",
		skin: "Spider Lily",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/m4a4/spider-lily.jpg",
		price: 13.71,
		id: 77,
		dropPercent: 83.78,
	},
	item25: {
		weapon: "AK-47",
		name: "AK-47 Legion of Anubis",
		skin: "Legion of Anubis",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/legion-of-anubis.jpg",
		price: 14.04,
		id: 56,
		dropPercent: 83.63,
	},
	item26: {
		weapon: "AK-47",
		name: "AK-47 Ice Coaled",
		skin: "Ice Coaled",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/ice-coaled.jpg",
		price: 14.52,
		id: 17,
		dropPercent: 83.41,
	},
	item27: {
		weapon: "G3SG1",
		name: "G3SG1 Flux",
		skin: "Flux",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/g3sg1/flux.jpg",
		price: 17.79,
		id: 67,
		dropPercent: 81.92,
	},
	item28: {
		weapon: "AK-47",
		name: "AK-47 Green Laminate",
		skin: "Green Laminate",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/ak-47/green-laminate.jpg",
		price: 17.9,
		id: 120,
		dropPercent: 81.87,
	},
	item29: {
		weapon: "M4A4",
		name: "M4A4 Desolate Space",
		skin: "Desolate Space",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a4/desolate-space.jpg",
		price: 18.68,
		id: 76,
		dropPercent: 81.51,
	},
	item30: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Midnight Storm",
		skin: "Midnight Storm",
		color: "light-blue",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/midnight-storm.jpg",
		price: 25.03,
		id: 46,
		dropPercent: 78.61,
	},
	item31: {
		weapon: "M4A4",
		name: "M4A4 In Living Color",
		skin: "In Living Color",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/in-living-color.jpg",
		price: 26.12,
		id: 75,
		dropPercent: 78.12,
	},
	item32: {
		weapon: "M4A1-S",
		name: "M4A1-S Black Lotus",
		skin: "Black Lotus",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/black-lotus.jpg",
		price: 27.15,
		id: 0,
		dropPercent: 77.65,
	},
	item33: {
		weapon: "M4A4",
		name: "M4A4 Global Offensive",
		skin: "Global Offensive",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/m4a4/global-offensive.jpg",
		price: 27.68,
		id: 4,
		dropPercent: 77.41,
	},
	item34: {
		weapon: "M4A4",
		name: "M4A4 Neo-Noir",
		skin: "Neo-Noir",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/neo-noir.jpg",
		price: 28.04,
		id: 74,
		dropPercent: 77.24,
	},
	item35: {
		weapon: "AWP",
		name: "AWP Neo-Noir",
		skin: "Neo-Noir",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/neo-noir.jpg",
		price: 28.92,
		id: 14,
		dropPercent: 76.84,
	},
	item36: {
		weapon: "AWP",
		name: "AWP Sun in Leo",
		skin: "Sun in Leo",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/awp/sun-in-leo.jpg",
		price: 31.71,
		id: 66,
		dropPercent: 75.57,
	},
	item37: {
		weapon: "M4A1-S",
		name: "M4A1-S Decimator",
		skin: "Decimator",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/decimator.jpg",
		price: 39.84,
		id: 19,
		dropPercent: 71.86,
	},
	item38: {
		weapon: "M4A1-S",
		name: "M4A1-S Nightmare",
		skin: "Nightmare",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/nightmare.jpg",
		price: 44.09,
		id: 20,
		dropPercent: 69.92,
	},
	item39: {
		weapon: "Glock-18",
		name: "Glock-18 Gamma Doppler",
		skin: "Gamma Doppler",
		color: "red",
		imgDist: "../dist/img/weapons/pistols/glock-18/gamma-doppler.jpg",
		price: 55.18,
		id: 36,
		dropPercent: 64.86,
	},
	item40: {
		weapon: "SSG-08",
		name: "SSG-08 Blood in the Water",
		skin: "Blood in the Water",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ssg-08/blood-in-the-water.jpg",
		price: 56.57,
		id: 65,
		dropPercent: 64.23,
	},
	item41: {
		weapon: "AK-47",
		name: "AK-47 Nightwish",
		skin: "Nightwish",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/nightwish.jpg",
		price: 61.27,
		id: 16,
		dropPercent: 62.08,
	},
	item42: {
		weapon: "M4A4",
		name: "M4A4 Red DDPAT",
		skin: "Red DDPAT",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/m4a4/red-ddpat.jpg",
		price: 66.44,
		id: 123,
		dropPercent: 59.73,
	},
	item43: {
		weapon: "AK-47",
		name: "AK-47 Frontside Misty",
		skin: "Frontside Misty",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/frontside-misty.jpg",
		price: 73.47,
		id: 55,
		dropPercent: 56.52,
	},
	item44: {
		weapon: "FAMAS",
		name: "FAMAS Waters of Nephthys",
		skin: "Waters of Nephthys",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/famas/waters-of-nephthys.jpg",
		price: 73.54,
		id: 64,
		dropPercent: 56.49,
	},
	item45: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Printstream",
		skin: "Printstream",
		color: "red",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/printstream.jpg",
		price: 85.72,
		id: 11,
		dropPercent: 50.93,
	},
	item46: {
		weapon: "Shadow Daggers",
		name: "Shadow Daggers Bright Water",
		skin: "Bright Water",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/shadow-daggers/bright-water.jpg",
		price: 92.1,
		id: 23,
		dropPercent: 48.02,
	},
	item47: {
		weapon: "M4A4",
		name: "M4A4 Temukau",
		skin: "Temukau",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/temukau.jpg",
		price: 99.24,
		id: 18,
		dropPercent: 44.77,
	},
	item48: {
		weapon: "M4A1-S",
		name: "M4A1-S Player Two",
		skin: "Player Two",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/player-two.jpg",
		price: 99.83,
		id: 104,
		dropPercent: 44.50,
	},
	item49: {
		weapon: "USP-S",
		name: "USP-S Printstream",
		skin: "Printstream",
		color: "red",
		imgDist: "../dist/img/weapons/pistols/usp-s/printstream.jpg",
		price: 109.15,
		id: 12,
		dropPercent: 40.24,
	},
	item50: {
		weapon: "AK-47",
		name: "AK-47 Redline",
		skin: "Redline",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/redline.jpg",
		price: 113.74,
		id: 8,
		dropPercent: 38.15,
	},
	item51: {
		weapon: "M4A1-S",
		name: "M4A1-S Chantico's Fire",
		skin: "Chantico's Fire",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/chanticos-fire.jpg",
		price: 114,
		id: 106,
		dropPercent: 38.03,
	},
	item52: {
		weapon: "AK-47",
		name: "AK-47 The Outsiders",
		skin: "The Outsiders",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/the-outsiders.jpg",
		price: 115.73,
		id: 113,
		dropPercent: 37.24,
	},
	item53: {
		weapon: "M4A4",
		name: "M4A4 The Emperor",
		skin: "The Emperor",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/the-emperor.jpg",
		price: 116.04,
		id: 73,
		dropPercent: 37.10,
	},
	item54: {
		weapon: "M4A1-S",
		name: "M4A1-S Hyper Beast",
		skin: "Hyper Beast",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/hyper-beast.jpg",
		price: 120.45,
		id: 105,
		dropPercent: 35.09,
	},
	item55: {
		weapon: "AWP",
		name: "AWP Asiimov",
		skin: "Asiimov",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/asiimov.jpg",
		price: 121.47,
		id: 86,
		dropPercent: 34.63,
	},
	item56: {
		weapon: "AK-47",
		name: "AK-47 Neon Rider",
		skin: "Neon Rider",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/neon-rider.jpg",
		price: 123.46,
		id: 116,
		dropPercent: 33.72,
	},
	item57: {
		weapon: "AK-47",
		name: "AK-47 Bloodsport",
		skin: "Bloodsport",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/bloodsport.jpg",
		price: 125.89,
		id: 54,
		dropPercent: 32.61,
	},
	item58: {
		weapon: "M4A4",
		name: "M4A4 Asiimov",
		skin: "Asiimov",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/asiimov.jpg",
		price: 130.01,
		id: 72,
		dropPercent: 30.73,
	},
	item59: {
		weapon: "AK-47",
		name: "AK-47 The Empress",
		skin: "The Empress",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/the-empress.jpg",
		price: 131.61,
		id: 115,
		dropPercent: 30.00,
	},
	item60: {
		weapon: "AK-47",
		name: "AK-47 Inheritance",
		skin: "Inheritance",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/inheritance.jpg",
		price: 154.53,
		id: 15,
		dropPercent: 30.00,
	},
	item61: {
		weapon: "AK-47",
		name: "AK-47 Asiimov",
		skin: "Asiimov",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/asiimov.jpg",
		price: 171.27,
		id: 13,
		dropPercent: 27.67,
	},
	item62: {
		weapon: "Classic Knife",
		name: "Classic Knife Safari Mesh",
		skin: "Mudder",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/classic/safari-mesh.jpg",
		price: 175.42,
		id: 9,
		dropPercent: 27.09,
	},
	item63: {
		weapon: "Huntsman Knife",
		name: "Huntsman Knife Black Laminate",
		skin: "Black Laminate",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/huntsman/black-laminate.jpg",
		price: 181.67,
		id: 24,
		dropPercent: 26.22,
	},
	item64: {
		weapon: "AWP",
		name: "AWP Chrome Cannon",
		skin: "Chrome Cannon",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/chrome-cannon.jpg",
		price: 212.41,
		id: 1,
		dropPercent: 21.93,
	},
	item65: {
		weapon: "Hydra Gloves",
		name: "Hydra Gloves Emerald",
		skin: "Emerald",
		color: "gold",
		imgDist: "../dist/img/weapons/gloves/emerald.jpg",
		price: 255.4,
		id: 34,
		dropPercent: 15.94,
	},
	item66: {
		weapon: "M4A4",
		name: "M4A4 The Coalition",
		skin: "The Coalition",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/the-coalition.jpg",
		price: 261.38,
		id: 122,
		dropPercent: 15.11,
	},
	item67: {
		weapon: "M4A4",
		name: "M4A4 Daybreak",
		skin: "Daybreak",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/m4a4/daybreak.jpg",
		price: 263.77,
		id: 126,
		dropPercent: 14.77,
	},
	item68: {
		weapon: "AK-47",
		name: "AK-47 Red Laminate",
		skin: "Red Laminate",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/red-laminate.jpg",
		price: 273.55,
		id: 119,
		dropPercent: 13.41,
	},
	item69: {
		weapon: "AWP",
		name: "AWP BOOM",
		skin: "BOOM",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/awp/boom.jpg",
		price: 278.02,
		id: 85,
		dropPercent: 12.79,
	},
	item70: {
		weapon: "AWP",
		name: "AWP Containment Breach",
		skin: "Containment Breach",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/containment-breach.jpg",
		price: 298.01,
		id: 84,
		dropPercent: 10.00,
	},
	item71: {
		weapon: "M4A4",
		name: "M4A4 Modern Hunter",
		skin: "Modern Hunter",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/m4a4/modern-hunter.jpg",
		price: 305,
		id: 125,
		dropPercent: 5.00,
	},
	item72: {
		weapon: "Huntsman Knife",
		name: "Huntsman Knife Lore",
		skin: "Lore",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/huntsman/lore.jpg",
		price: 307.24,
		id: 2,
		dropPercent: 5.00,
	},
	item73: {
		weapon: "AWP",
		name: "AWP ",
		skin: "Crakow!",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/awp/crackow.jpg",
		price: 314.45,
		id: 127,
		dropPercent: 4.99,
	},
	item74: {
		weapon: "AUG",
		name: "AUG Midnight Lily",
		skin: "Midnight Lily",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/aug/midnight-lily.jpg",
		price: 315,
		id: 130,
		dropPercent: 4.99,
	},
	item75: {
		weapon: "SSG 08",
		name: "SSG 08 Sea Calico",
		skin: "Sea Calico",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/ssg-08/sea-calico.jpg",
		price: 325.49,
		id: 129,
		dropPercent: 4.98,
	},
	item76: {
		weapon: "M4A1-S",
		name: "M4A1-S Vaporwave",
		skin: "Vaporwave",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/vaporwave.jpg",
		price: 327.04,
		id: 103,
		dropPercent: 4.98,
	},
	item77: {
		weapon: "AK-47",
		name: "AK-47 Case Hardened",
		skin: "Case Hardened",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/case-hardened.jpg",
		price: 332.56,
		id: 118,
		dropPercent: 4.97,
	},
	item78: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Fennec Fox",
		skin: "Fennec Fox",
		color: "pink",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/fennec-fox.jpg",
		price: 353.77,
		id: 45,
		dropPercent: 4.95,
	},
	item79: {
		weapon: "M4A1-S",
		name: "M4A1-S Master Piece",
		skin: "Master Piece",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/master-piece.jpg",
		price: 365.4,
		id: 108,
		dropPercent: 4.93,
	},
	item80: {
		weapon: "SSG-08",
		name: "SSG-08 Death Strike",
		skin: "Death Strike",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ssg-08/death-strike.jpg",
		price: 365.46,
		id: 63,
		dropPercent: 4.93,
	},
	item81: {
		weapon: "AK-47",
		name: "AK-47 Fuel Injector",
		skin: "Fuel Injector",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/fuel-injector.jpg",
		price: 375.71,
		id: 117,
		dropPercent: 4.92,
	},
	item82: {
		weapon: "AWP",
		name: "AWP Oni Taiji",
		skin: "Oni Taiji",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/oni-taiji.jpg",
		price: 403.88,
		id: 83,
		dropPercent: 4.89,
	},
	item83: {
		weapon: "M4A1-S",
		name: "M4A1-S Printstream",
		skin: "Printstream",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/printstream.jpg",
		price: 408.7,
		id: 102,
		dropPercent: 4.88,
	},
	item84: {
		weapon: "M4A4",
		name: "M4A4 Radiation Hazard",
		skin: "Radiation Hazard",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/m4a4/radiation-hazard.jpg",
		price: 421.01,
		id: 124,
		dropPercent: 4.87,
	},
	item85: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Hand Cannon",
		skin: "Hand Cannon",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/hand-cannon.jpg",
		price: 427.71,
		id: 44,
		dropPercent: 4.86,
	},
	item86: {
		weapon: "M4A4",
		name: "M4A4 Eye of Horus",
		skin: "Eye of Horus",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a4/eye-of-horus.jpg",
		price: 455.06,
		id: 71,
		dropPercent: 4.83,
	},
	item87: {
		weapon: "M4A1-S",
		name: "M4A1-S Icarus Fell",
		skin: "Icarus Fell",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/icarus-fell.jpg",
		price: 460.01,
		id: 61,
		dropPercent: 4.83,
	},
	item88: {
		weapon: "M4A1-S",
		name: "M4A1-S Fade",
		skin: "Fade",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/fade.jpg",
		price: 470.49,
		id: 101,
		dropPercent: 4.81,
	},
	item89: {
		weapon: "AWP",
		name: "AWP Lightning Strike",
		skin: "Lightning Strike",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/lightning-strike.jpg",
		price: 495.95,
		id: 82,
		dropPercent: 4.79,
	},
	item90: {
		weapon: "Desert Eagle",
		name: "Desert Eagle Blaze",
		skin: "Blaze",
		color: "purple",
		imgDist: "../dist/img/weapons/pistols/desert-eagle/blaze.jpg",
		price: 553.19,
		id: 6,
		dropPercent: 4.72,
	},
	item91: {
		weapon: "Bayonet Knife",
		name: "Bayonet Knife Doppler",
		skin: "Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/bayonet/doppler.jpg",
		price: 572.92,
		id: 25,
		dropPercent: 4.70,
	},
	item92: {
		weapon: "M4A1-S",
		name: "M4A1-S Blue Phosphor",
		skin: "Blue Phosphor",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/blue-phosphor.jpg",
		price: 584.96,
		id: 107,
		dropPercent: 4.69,
	},
	item93: {
		weapon: "Talon Knife",
		name: "Talon Knife Tiger Tooth",
		skin: "Tiger Tooth",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/tiger-tooth.jpg",
		price: 611.78,
		id: 10,
		dropPercent: 4.66,
	},
	item94: {
		weapon: "AK-47",
		name: "AK-47 Vulcan",
		skin: "Vulcan",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/vulcan.jpg",
		price: 675.39,
		id: 53,
		dropPercent: 4.59,
	},
	item95: {
		weapon: "M4A1-S",
		name: "M4A1-S Hot Rod",
		skin: "Hot Rod",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/hot-rod.jpg",
		price: 883.8,
		id: 111,
		dropPercent: 4.35,
	},
	item96: {
		weapon: "AWP",
		name: "AWP Fade",
		skin: "Fade",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/fade.jpg",
		price: 922.32,
		id: 81,
		dropPercent: 4.31,
	},
	item97: {
		weapon: "Talon Knife",
		name: "Talon Knife Doppler",
		skin: "Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/doppler.jpg",
		price: 952.77,
		id: 133,
		dropPercent: 4.28,
	},
	item98: {
		weapon: "Butterfly Knife",
		name: "Butterfly Knife Freehand",
		skin: "Freehand",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/freehand.jpg",
		price: 999.15,
		id: 22,
		dropPercent: 4.22,
	},
	item99: {
		weapon: "M4A4",
		name: "M4A4 Poseidon",
		skin: "Poseidon",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a4/poseidon.jpg",
		price: 1066.26,
		id: 60,
		dropPercent: 4.15,
	},
	item100: {
		weapon: "AK-47",
		name: "AK-47 B the Monster",
		skin: "B the Monster",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/b-the-monster.jpg",
		price: 1082.86,
		id: 114,
		dropPercent: 4.13,
	},
	item101: {
		weapon: "Talon Knife",
		name: "Talon Knife Fade",
		skin: "Fade",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/fade.jpg",
		price: 1130.66,
		id: 134,
		dropPercent: 4.08,
	},
	item102: {
		weapon: "Driver Gloves",
		name: "Driver Gloves Impreial Plaid",
		skin: "Impreial Plaid",
		color: "gold",
		imgDist: "../dist/img/weapons/gloves/imperial-plaid.jpg",
		price: 1213.36,
		id: 31,
		dropPercent: 3.98,
	},
	item103: {
		weapon: "AWP",
		name: "AWP CMYK",
		skin: "CMYK",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/cmyk.jpg",
		price: 1334.42,
		id: 128,
		dropPercent: 3.85,
	},
	item104: {
		weapon: "M4A1-S",
		name: "M4A1-S Imminent Danger",
		skin: "Imminent Danger",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/imminent-danger.jpg",
		price: 1415.18,
		id: 110,
		dropPercent: 3.76,
	},
	item105: {
		weapon: "Karambit Knife",
		name: "Karambit Knife Doppler",
		skin: "Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/karambit/doppler.jpg",
		price: 1450,
		id: 147,
		dropPercent: 3.72,
	},
	item106: {
		weapon: "AK-47",
		name: "AK-47 X-Ray",
		skin: "X-Ray",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/x-ray.jpg",
		price: 1770.31,
		id: 52,
		dropPercent: 3.36,
	},
	item107: {
		weapon: "Karambit Knife",
		name: "Karambit Knife Lore",
		skin: "Lore",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/karambit/lore.jpg",
		price: 1811.26,
		id: 143,
		dropPercent: 3.32,
	},
	item108: {
		weapon: "AK-47",
		name: "AK-47 Hydroponic",
		skin: "Hydroponic",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/ak-47/hydroponic.jpg",
		price: 1908.76,
		id: 121,
		dropPercent: 3.21,
	},
	item109: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Autotronic",
		skin: "Autotronic",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/autotronic.jpg",
		price: 2023.53,
		id: 97,
		dropPercent: 3.08,
	},
	item110: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Marble Fade",
		skin: "Marble Fade",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/marble-fade.jpg",
		price: 2039,
		id: 99,
		dropPercent: 3.06,
	},
	item111: {
		weapon: "AUG",
		name: "AUG Hot Rod",
		skin: "Hot Rod",
		color: "blue",
		imgDist: "../dist/img/weapons/rifles/aug/hot-rod.jpg",
		price: 2039.79,
		id: 131,
		dropPercent: 3.06,
	},
	item112: {
		weapon: "AK-47",
		name: "AK-47 Fire Serpent",
		skin: "Fire Serpent",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/fire-serpent.jpg",
		price: 2113.72,
		id: 51,
		dropPercent: 2.98,
	},
	item113: {
		weapon: "Karambit Knife",
		name: "Karambit Knife Gamma Doppler",
		skin: "Gamma Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/karambit/gamma-doppler.jpg",
		price: 2121.96,
		id: 145,
		dropPercent: 2.97,
	},
	item114: {
		weapon: "M4A1-S",
		name: "M4A1-S Welcome to the Jungle",
		skin: "Welcome to the Jungle",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/welcome-to-the-jungle.jpg",
		price: 2136.79,
		id: 109,
		dropPercent: 2.95,
	},
	item115: {
		weapon: "Sport Gloves",
		name: "Sport Gloves Nocts",
		skin: "Nocts",
		color: "gold",
		imgDist: "../dist/img/weapons/gloves/nocts.jpg",
		price: 2254.99,
		id: 32,
		dropPercent: 2.82,
	},
	item116: {
		weapon: "AWP",
		name: "AWP Desert Hydra",
		skin: "Desert Hydra",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/desert-hydra.jpg",
		price: 2327.58,
		id: 26,
		dropPercent: 2.74,
	},
	item117: {
		weapon: "Talon Knife",
		name: "Talon Knife Crimson Web",
		skin: "Crimson Web",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/crimson-web.jpg",
		price: 2334.98,
		id: 135,
		dropPercent: 2.73,
	},
	item118: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Doppler",
		skin: "Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/doppler.jpg",
		price: 2357.96,
		id: 100,
		dropPercent: 2.70,
	},
	item119: {
		weapon: "Karambit Knife",
		name: "Karambit Knife Fade",
		skin: "Fade",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/karambit/fade.jpg",
		price: 2513.23,
		id: 148,
		dropPercent: 2.53,
	},
	item120: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Gamma Doppler",
		skin: "Gamma Doppler",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/gamma-doppler.jpg",
		price: 2635.84,
		id: 95,
		dropPercent: 2.39,
	},
	item121: {
		weapon: "Specialist Gloves",
		name: "Specialist Gloves Marble Fade",
		skin: "Marble Fade",
		color: "gold",
		imgDist: "../dist/img/weapons/gloves/marble-fade.jpg",
		price: 2639.76,
		id: 33,
		dropPercent: 2.39,
	},
	item122: {
		weapon: "M4A1-S",
		name: "M4A1-S Knight",
		skin: "Knight",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/m4a1-s/knight.jpg",
		price: 2736.12,
		id: 112,
		dropPercent: 2.28,
	},
	item123: {
		weapon: "AK-47",
		name: "AK-47 Gold Arabesque",
		skin: "Gold Arabesque",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/ak-47/gold-arabesque.jpg",
		price: 2780.22,
		id: 50,
		dropPercent: 2.23,
	},
	item124: {
		weapon: "Talon Knife",
		name: "Talon Knife Doppler Black Pearl",
		skin: "Doppler Black Pearl",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/black-pearl.jpg",
		price: 3099.5,
		id: 138,
		dropPercent: 1.87,
	},
	item125: {
		weapon: "Talon Knife",
		name: "Talon Knife Doppler Black Pearl",
		skin: "Doppler Black Pearl",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/black-pearl.jpg",
		price: 3099.5,
		id: 138,
		dropPercent: 1.87,
	},
	item126: {
		weapon: "AWP",
		name: "AWP The Prince",
		skin: "The Prince",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/the-prince.jpg",
		price: 3207.63,
		id: 30,
		dropPercent: 1.75,
	},
	item127: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Fade",
		skin: "Fade",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/fade.jpg",
		price: 3239.54,
		id: 94,
		dropPercent: 1.72,
	},
	item128: {
		weapon: "AUG",
		name: "AUG Akihabara Accept",
		skin: "Akihabara Accept",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/aug/akihabara-accept.jpg",
		price: 3437.2,
		id: 132,
		dropPercent: 1.50,
	},
	item129: {
		weapon: "Karambit Knife",
		name: "Karambit Knife Doppler Black Pearl",
		skin: "Doppler Black Pearl",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/karambit/black-pearl.jpg",
		price: 3535.29,
		id: 151,
		dropPercent: 1.39,
	},
	item130: {
		weapon: "Butterly Knife",
		name: "Butterly Knife Lore",
		skin: "Lore",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/butterfly/lore.jpg",
		price: 3680.01,
		id: 98,
		dropPercent: 1.23,
	},
	item131: {
		weapon: "Talon Knife",
		name: "Talon Knife Doppler Sapphire",
		skin: "Doppler Sapphire",
		color: "gold",
		imgDist: "../dist/img/weapons/knives/talon/sapphire.jpg",
		price: 3840.52,
		id: 137,
		dropPercent: 1.05,
	},
	item132: {
		weapon: "AWP",
		name: "AWP Medusa",
		skin: "Medusa",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/medusa.jpg",
		price: 4328.88,
		id: 29,
		dropPercent: 0.50,
	},
};

const spinBtn = document.querySelector(".spin");
const caseItemsBox = document.querySelectorAll(".case__items");
const countItemsAmount = Object.keys(items2).length;
const winPupup = document.querySelector(".win-popup");
const sellBtn = document.querySelector(".win-popup__btn--sell");
const takeBtn = document.querySelector(".win-popup__btn--take");
const winningItemImg = document.querySelector(".win-popup__img");
const winningItemName = document.querySelector(".win-popup__item-name");
const winningItemPrice = document.querySelector(".win-popup__item-price");
const winningItemBox = document.querySelector(".win-popup__container");
// balanceAmount và balanceAmountMobile đã được khai báo trong balance.js
const caseAmountBtns = document.querySelectorAll(".case__button-amount");
const backBtn = document.querySelector(".case__btn--back");
const muteBtn = document.querySelector(".case__btn--mute");
const allCases = document.querySelector(".case__allcases");
const casePrice = 300.0; // price of case
let currentWinningItem; // current item that won
let casesAmount = 1; // how many cases user will open
let winningItems = []; // all winning items of current spin

// Mock Stats - Thay thế Firebase
const casesOpenedText = document.querySelector("#casesopened");
const battlesCreatedText = document.querySelector("#battlescreated");
const upgradesText = document.querySelector("#upgrades");
const jackpotsWonText = document.querySelector("#jackpotswon");

const updateStatsDisplay = () => {
	if (window.mockStats) {
		const stats = window.mockStats.getStats();
		if (casesOpenedText) casesOpenedText.textContent = stats.caseopened || 0;
		if (battlesCreatedText) battlesCreatedText.textContent = stats.battlecreated || 0;
		if (upgradesText) upgradesText.textContent = stats.upgrades || 0;
		if (jackpotsWonText) jackpotsWonText.textContent = stats.jackpotwon || 0;
	}
};

updateStatsDisplay();
setInterval(updateStatsDisplay, 1000);

function incrementCases() {
	// Sử dụng mock-stats thay vì Firebase
	if (window.mockStats) {
		for (let i = 0; i < casesAmount; i++) {
			window.mockStats.incrementCases();
		}
		updateStatsDisplay();
}
}

const createInfoAboutItemsInChest = () => {
	// function to create info about all items in case
	const dropBox = document.querySelector(".case__drop-box"); // container for info about all items in case

	for (i = 0; i < countItemsAmount; i++) {
		// create all items
		const dropItem = document.createElement("div"); // item elements
		const dropItemPercent = document.createElement("p");
		const dropItemImg = document.createElement("img");
		const dropItemTextBox = document.createElement("div");
		const dropItemTextBoxLeft = document.createElement("div");
		const dropItemName = document.createElement("p");
		const dropItemSkin = document.createElement("p");
		const dropItemPrice = document.createElement("p");

		dropItem.classList.add("case__drop"); // set their classes
		dropItem.classList.add(items2[`item${i}`].color + "-drop2");
		dropItem.style.order = "-" + items2[`item${i}`].price.toFixed(0);
		dropItemPercent.classList.add("case__drop-percent");
		dropItemImg.classList.add("case__drop-img");
		dropItemTextBox.classList.add("case__drop-textbox");
		dropItemTextBoxLeft.classList.add("case__drop-textbox-left");
		dropItemName.classList.add("case__drop-item");
		dropItemSkin.classList.add("case__drop-skin");
		dropItemSkin.classList.add(items2[`item${i}`].color + "-text");
		dropItemPrice.classList.add("case__drop-price");

		dropItemImg.setAttribute("src", items2[`item${i}`].imgDist); // set attributes
		dropItemImg.setAttribute("alt", items2[`item${i}`].name);

			// Hiển thị dropPercent gốc (như các case khác)
		dropItemPercent.textContent = items2[`item${i}`].dropPercent.toFixed(2) + "%"; // set textcontent
		dropItemName.textContent = items2[`item${i}`].weapon;
		dropItemSkin.textContent = items2[`item${i}`].skin;
		dropItemPrice.textContent = items2[`item${i}`].price + "$";

		dropItemTextBoxLeft.append(dropItemName, dropItemSkin); // append them in correct order
		dropItemTextBox.append(dropItemTextBoxLeft, dropItemPrice);
		dropItem.append(dropItemPercent, dropItemImg, dropItemTextBox);
		dropBox.append(dropItem); // append item to container
	}
};

const createItemsInChest = () => {
	// function to create random items in case
	const caseItemsBox = document.querySelectorAll(".case__items"); // get every case

	caseItemsBox.forEach((box) => {
		// for each case, add items to it
		for (i = 0; i < 100; i++) {
			// Random item theo dropPercent thay vì 50/50
			const randomItem = window.getRandomItemByDropPercent 
				? window.getRandomItemByDropPercent(items2)
				: Math.floor(Math.random() * Object.keys(items2).length); // Fallback

			const item = document.createElement("div"); // item elements
			const itemImg = document.createElement("img");
			const itemItemName = document.createElement("p");
			const itemSkinName = document.createElement("p");

			item.classList.add("case__item", `case__item${box.id}`); // item classes
			item.classList.add(items2[`item${randomItem}`].color + "-drop");
			item.style.border = "none";
			item.id = `item${randomItem}`;
			itemImg.classList.add("case__img");
			itemItemName.classList.add("case__item-name");
			itemSkinName.classList.add("case__skin-name");
			itemSkinName.classList.add(items2[`item${randomItem}`].color + "-text");

			itemImg.setAttribute("src", items2[`item${randomItem}`].imgDist); // item attributes and text content
			itemImg.setAttribute("alt", items2[`item${randomItem}`].name);
			itemItemName.textContent = items2[`item${randomItem}`].weapon;
			itemSkinName.textContent = items2[`item${randomItem}`].skin;

			item.append(itemImg, itemItemName, itemSkinName); // append item elements in order
			box.append(item); // append item to case
		}
	});
};

const setBtnText = () => {
	// function to set button text content
	if (
		parseFloat(localStorage.getItem("Balance").slice(0, -1)) >=
		casePrice * casesAmount
	) {
		spinBtn.textContent = `open ${casePrice * casesAmount}.00$`; // if user have enought balance set button to show how much it cost
	} else {
		spinBtn.textContent = "add balance"; // if not set it to "add balance"
	}
};

const spinCase = () => {
	// function for spinning case
	const caseItemsBox = document.querySelectorAll(".case__items"); // get all case boxes

	if (
		// if balance of player is higher than case cost and case is not spinning then continue
		parseFloat(localStorage.getItem("Balance").slice(0, -1)) >=
			casePrice * casesAmount &&
		spinBtn.textContent !== "spining"
	) {
		const caseOpeningSound = new Audio("../dist/audio/open.mp3"); // set open audio

		if (muteBtn.classList.contains("not-muted")) {
			// if sounds is not muted then play audio
			caseOpeningSound.play();
		}

		caseItemsBox.forEach((box) => {
			// for each case box

			const howStrongSpin = Math.floor(Math.random() * 5000 - 10000); // get random movement between -5000 to -1000 px;

			spinBtn.textContent = "spining"; // set button textContent to spinning

			const casesOpenedToAdd =
				parseInt(localStorage.getItem("casesOpened")) + 1;
			localStorage.setItem("casesOpened", casesOpenedToAdd); // amount of cases to added to stats on profile

			const balanceAfterOpening = (
				parseFloat(localStorage.getItem("Balance").slice(0, -1)) - casePrice
			).toFixed(2); // get balance after opening case

			localStorage.setItem("Balance", balanceAfterOpening + "$"); // set balance after opening case to localStorage
			setBalance(); // function from balance.js file (refreshing balance amount in text)

			box.style.left = howStrongSpin + "px"; // set how strong spin is
			box.style.transition = "left 5s cubic-bezier(0,1,0.5,1)"; // set its animation

			// after animation end, find winning item
			setTimeout(() => {
				function getWinningItem() {
					// get position of middle point
					const redLineX =
						box.parentElement.children[0].getBoundingClientRect().x;

					const items = box.querySelectorAll(".case__item"); // get all items of current case box
					let closestItem = null;
					let closestDistance = Infinity;

					items.forEach((item) => {
						const itemCenterX =
							item.getBoundingClientRect().x + item.offsetWidth / 2;
						const distance = Math.abs(itemCenterX - redLineX);

						if (distance < closestDistance) {
							closestDistance = distance;
							closestItem = item;
						}
					});

					return closestItem;
				}

				// get wiining item and set it in win popup
				const winningItem = getWinningItem();
				if (winningItem) {
					winningItems.push(winningItem); // push items to winning items array
					winningItemBox.classList.value = "";
					winningItemBox.classList.add(
						"win-popup__container",
						`${items2[`${winningItem.id}`].color + "-win"}`
					);
					winningItemImg.setAttribute(
						"src",
						items2[`${winningItem.id}`].imgDist
					);
					winningItemImg.setAttribute("alt", items2[`${winningItem.id}`].name);
					winningItemName.textContent = items2[`${winningItem.id}`].name;
					winningItemPrice.textContent =
						items2[`${winningItem.id}`].price + "$";

					createDropFromCases(winningItem);
					hideWinPopup();
				}
			}, 5000); // start after end of anim (5s)
		});
	} else if (spinBtn.textContent !== "spining") {
		window.open("../deposit", "_self"); // if user dont have enought balance then open deposit site
	}
};

const hideWinPopup = () => {
	if (casesAmount === 1) {
		// if user only open one case than show win popup
		winPupup.classList.toggle("hidden");
	} else {
		// if not automatically decide to take items, and not sell them
		setTimeout(() => {
			takeWinningItem();
			setBtnText();
		}, 2000); // do it after 2s after end of anim
	}
};

const sellWinningItem = () => {
	// function to sell items (works only if user open one case at once)
	const currentBalance = parseFloat(
		localStorage.getItem("Balance").slice(0, -1)
	); // get current balance
	const itemPrice = parseFloat(winningItemPrice.textContent); // get item price
	const howMuchToAddToBalance = (currentBalance + itemPrice).toFixed(2); // get how much balance player will have after selling item
	localStorage.setItem("Balance", howMuchToAddToBalance + "$"); // set new balance

	hideWinPopup();
	refreshBalance();
	resetBoxAnimation();
};

const takeWinningItem = () => {
	// funciton to add won items to inventory of user
	for (i = 0; i < winningItems.length; i++) {
		// do this for every won item
		// if user didnt had this item ever in inventory, then set it to 1
		// if player had that item then get its localStorage and add 1 to it
		if (
			localStorage.getItem("id" + items2[`${winningItems[i].id}`].id) ===
				null ||
			localStorage.getItem("id" + items2[`${winningItems[i].id}`].id) === NaN
		) {
			localStorage.setItem("id" + items2[`${winningItems[i].id}`].id, 1);
		} else {
			localStorage.setItem(
				"id" + items2[`${winningItems[i].id}`].id,
				parseInt(
					localStorage.getItem("id" + items2[`${winningItems[i].id}`].id)
				) + 1
			);
		}
	}

	if (casesAmount === 1) {
		hideWinPopup();
	}
	resetBoxAnimation();
};

const refreshBalance = () => {
	// function to refresh balance
	balanceAmount.textContent = localStorage.getItem("Balance");
	balanceAmountMobile.textContent = localStorage.getItem("Balance");
};

const resetBoxAnimation = () => {
	// function to reset case box animation
	const caseItemsBox = document.querySelectorAll(".case__items");
	caseItemsBox.forEach((box) => {
		box.innerHTML = "";
		box.style.transition = "0.01s";
		box.style.left = "0";
	});

	winningItems = [];
	setBtnText();
	createItemsInChest();
};

const goBackToMainSite = () => {
	// function to open main site
	window.open("../", "_self");
};

const muteSound = () => {
	// function to mute case sound
	muteBtn.classList.toggle("not-muted"); // toggle mute

	if (localStorage.getItem("muted") == 0) {
		localStorage.setItem("muted", 1);
	} else {
		localStorage.setItem("muted", 0);
	}

	setMuteSound();
};

const setMuteSound = () => {
	if (localStorage.getItem("muted") == 0) {
		// if sound is not mutted, set correct icons
		muteBtn.lastElementChild.style.display = "none";
		muteBtn.firstElementChild.style.display = "block";
		muteBtn.classList.add("not-muted");
	} else {
		// if its muted, set correct icons
		muteBtn.lastElementChild.style.display = "block";
		muteBtn.firstElementChild.style.display = "none";
		muteBtn.classList.remove("not-muted");
	}
};

const createBoxes = () => {
	// function to create case boxes
	for (i = 0; i < casesAmount; i++) {
		// create boxes based on how many player choosed
		const caseItem = document.createElement("div");
		const casePoint = document.createElement("div");
		const caseTriangle = document.createElement("div");
		const caseTriangleBtm = document.createElement("div");
		const caseItems = document.createElement("div");

		if (
			casesAmount % 2 === 0 ||
			(casesAmount % 2 !== 0 && i < casesAmount - 1)
		) {
			caseItem.style.width = "calc(50% - 32px)";
		}

		caseItem.classList.add("case__container");
		caseItem.id = `caseBox${i}`;
		casePoint.classList.add("case__middle-point");
		caseTriangle.classList.add("case__middle-triangle");
		caseTriangleBtm.classList.add(
			"case__middle-triangle",
			"case__middle-triangle--bottom"
		);
		caseItems.classList.add("case__items");
		caseItems.classList.add("case__items" + [i]);
		caseItems.id = i;

		caseItem.append(casePoint, caseTriangle, caseTriangleBtm, caseItems);
		allCases.append(caseItem);
	}
	createItemsInChest();
};

function setCasesAmount() {
	// set cases amount to create
	if (spinBtn.textContent !== "spining") {
		// if case is not spinning
		allCases.innerHTML = ""; // clear cases

		switch (this.id) {
			case "1Case":
				casesAmount = 1; // set how many cases to create based on id of button
				break;
			case "2Case":
				casesAmount = 2;
				break;
			case "3Case":
				casesAmount = 3;
				break;
			case "4Case":
				casesAmount = 4;
				break;
			case "5Case":
				casesAmount = 5;
				break;
		}

		createBoxes();
		setBtnText();
	}
}

const addEventListeners = () => {
	spinBtn.addEventListener("click", spinCase);
	spinBtn.addEventListener("click", incrementCases);
	takeBtn.addEventListener("click", takeWinningItem);
	sellBtn.addEventListener("click", sellWinningItem);
	backBtn.addEventListener("click", goBackToMainSite);
	muteBtn.addEventListener("click", muteSound);

	caseAmountBtns.forEach((btn) => {
		btn.addEventListener("click", setCasesAmount);
	});
};

createItemsInChest();
setBtnText();
createInfoAboutItemsInChest();
addEventListeners();
setMuteSound();





