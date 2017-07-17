export default = {
  1: { uri: '150395', start: 2 }, // TODO: check pages
  2: { uri: '', start:  },
  3: { uri: '', start:  },
  4: { uri: '460730', start: 9 }, // TODO: check pages
  5: { uri: '460682', start: 13 }, // TODO: check pages
  6: { uri: '147031', start: 7 }, // TODO: check pages
  7: { uri: '460700', start: 9 }, // TODO: check pages
  8: { uri: '460708', start: 9 }, // TODO: check pages
  9: { uri: '460716', start: 7 }, // TODO: check pages
  10: { uri: 'GreatBooksOfTheWesternWorldVol10', start: 14 }, // uploaded spliced pdf bc pgs. 16-17 missing
  11: { uri: '126332', start: 12 }, // TODO: text blotchy, pgs. 142-3 missing, pgs. 6-7 duplicated
  12: { uri: '126326', start: 12 },
  13: { uri: '126331', start: 6 },
  14: { uri: '147037', start: 6 }, // pgs 34-35, 110-11, 357, 388-9 missing,
  15: { uri: '147039', start: 7 }, // TODO: check pages
  16: { uri: '126325', start: 14}, // TODO: check pages
  17: { uri: '120629', start: 6 },
  18: { uri: '120626', start: 8 }, // pgs. 112-13, 126 missing, 204-05 duplicated
  19: { uri: '126741', start: 12 }, // pgs. 270-1, 372-3, 380-1, 462-3, 494-5, 497-514, 602-3 missing
  20: { uri: '462789', start: 15 }, //
  21: { uri: '', start:  }, // borrow here: https://archive.org/details/britannicagreatb00dant
  22: { uri: '120612', start: 7 }, // pgs. 156, 158 missing
  23: { uri: '147040', start: 8 }, // pgs. 2, 32-3, 39-40, 44, 46, 48
  24: { uri: '', start:  }, // borrow here: https://archive.org/details/greatbooksofwest24ency
  25: { uri: '', start:  },
  26: { uri: '', start:  },
  27: { uri: '', start:  },
  28: { uri: '', start:  }, // diagrams
  29: { uri: '', start:  },
  30: { uri: '', start:  }, // diagrams
  31: { uri: '', start:  },
  32: { uri: '', start:  }, // diagrams
  33: { uri: '', start:  },
  34: { uri: '', start:  }, // diagrams included
  35: { uri: '', start:  },
  36: { uri: '', start:  }, // diagrams
  37: { uri: '', start:  }, // diagrams included
  38: { uri: '', start:  }, // diagrams
  39: { uri: '', start:  },
  40: { uri: '', start:  },
  41: { uri: '', start:  },
  42: { uri: '', start:  }, // diagrams
  43: { uri: '', start:  },
  44: { uri: '', start:  },
  45: { uri: '', start:  },
  46: { uri: '', start:  },
  47: { uri: '', start:  },
  48: { uri: '', start:  },
  49: { uri: '', start:  }, // diagrams
  50: { uri: '', start:  },
  51: { uri: '', start:  }, // diagrams (few)
  52: { uri: '', start:  },
  53: { uri: '', start:  }, // diagrams
  54: { uri: '', start:  }, // diagrams (few)
  55: { uri: '', start:  }, // diagrams (few)
  56: { uri: '', start:  }, // diagrams
  57: { uri: '', start:  }, // diagrams (few)
  58: { uri: '', start:  }, // diagrams (few)
  59: { uri: '', start:  },

}

// http://www.archive.org/download/in.ernet.dli.2015.126326/page/n57_large.jpg

export const getPage = (page, index) => {
  if (typeof page !== 'number') page = parseInt(page);
  return page + index
}

for (let i = 4; i > 55; i++) {
  archive[i]['uri'] = 'in.ernet.dli.2015.'.concat(archive[i]['uri'])
}