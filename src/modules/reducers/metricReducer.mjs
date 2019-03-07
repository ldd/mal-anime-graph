export function metricReducer(data = []) {
  return data.reduce(
    (
      dic,
      {
        score = 0,
        episodes = 0,
        episodesWatched = 0,
        timesWatched = 1,
        genres = [],
        // studios = [],
        duration = 0,
        season,
        startDate: { year } = {}
      } = {}
    ) => {
      const totalDuration =
        duration * episodesWatched * 1 +
        duration * episodes * (timesWatched - 1);
      const yearsCount = (dic.years.count[year] || 0) + 1;
      const seasonsCount = (dic.seasons.count[season] || 0) + 1;
      const genreCountMap = genres.reduce((acc, genre) => {
        const genresCount = (acc.count[genre] || 0) + 1;
        return {
          count: { ...acc.count, [genre]: genresCount },
          duration: {
            ...acc.duration,
            [genre]: (acc.duration[genre] || 0) + totalDuration
          },
          score: {
            ...acc.score,
            [genre]:
              ((acc.score[genre] || 0) * (genresCount - 1) + score) /
              genresCount
          }
        };
      }, dic.genres);
      return {
        years: {
          count: {
            ...dic.years.count,
            [year]: yearsCount
          },
          duration: {
            ...dic.years.duration,
            [year]: (dic.years.duration[year] || 0) + totalDuration
          },
          score: {
            ...dic.years.score,
            [year]:
              ((dic.years.score[year] || 0) * (yearsCount - 1) + score) /
              yearsCount
          }
        },
        seasons: {
          count: {
            ...dic.seasons.count,
            [season]: seasonsCount
          },
          duration: {
            ...dic.seasons.duration,
            [season]: (dic.seasons.duration[season] || 0) + totalDuration
          },
          score: {
            ...dic.seasons.score,
            [season]:
              ((dic.seasons.score[season] || 0) * (seasonsCount - 1) + score) /
              seasonsCount
          }
        },
        genres: {
          count: {
            ...dic.genres.count,
            ...genreCountMap.count
          },
          duration: {
            ...dic.genres.duration,
            ...genreCountMap.duration
          },
          score: {
            ...dic.genres.score,
            ...genreCountMap.score
          }
        }
      };
    },
    {
      years: { count: {}, duration: {}, score: {} },
      seasons: { count: {}, duration: {}, score: {} },
      genres: { count: {}, duration: {}, score: {} }
    }
  );
}
