function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

class App extends React.Component {
	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const	series = 5;
		const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({ data });
	}

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
    const chartsSerieProps = {
      colors,
      labels,
      max
    };
		
		return (
			<section>
        <div className="Charts">
          {
            data.map((serie, serieIndex) => {
              chartsSerieProps.serie = serie;
              chartsSerieProps.serieIndex = serieIndex;
              chartsSerieProps.specialClassName = null;

              return <ChartsSerie {...chartsSerieProps} />;
            })
          }
        </div>

        <div className="Charts">
  				{
  				  data.map((serie, serieIndex) => {
              chartsSerieProps.serie = serie;
              chartsSerieProps.serieIndex = serieIndex;
              chartsSerieProps.specialClassName = 'stacked';

              return <ChartsSerie {...chartsSerieProps} max={null} />;
            })
  				}
  			</div>

        <div className="Charts">
  				{
  				  data.map((serie, serieIndex) => {
              chartsSerieProps.serie = serie;
              chartsSerieProps.serieIndex = serieIndex;
              chartsSerieProps.specialClassName = 'layered';

              return <ChartsSerie {...chartsSerieProps} />;
            })
  				}
  			</div>

        <div className="Charts horizontal">
  				{
  				  data.map((serie, serieIndex) => {
              chartsSerieProps.serie = serie;
              chartsSerieProps.serieIndex = serieIndex;
              chartsSerieProps.specialClassName = null;

              return <ChartsSerie {...chartsSerieProps} isHorizontal />;
            })
  				}
  			</div>

        <div className="Legend">
    			{ labels.map((label, labelIndex) => {
              return (
                <div>
                  <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
                  <span className="Legend--label">{ label }</span>
                </div>
              );
            })
    			}
    		</div>
			</section>
		);
	}
}

function ChartsSerie(props) {
  const { serie, serieIndex, labels, colors, max, specialClassName, isHorizontal } = props;
  const chartsSerieHeight = isHorizontal ? 'auto' : 250;
  const chartsClassName = specialClassName ? `Charts--serie ${specialClassName}` : 'Charts--serie';

  let sortedSerie = serie.slice(0);
  let sum = serie.reduce((carry, current) => carry + current, 0);

  sortedSerie.sort(compareNumbers);

  return (
    <div className={chartsClassName} key={ serieIndex } style={{height: chartsSerieHeight}}>

      <label>{ labels[serieIndex] }</label>

      { serie.map((item, itemIndex) => {
          const color = colors[itemIndex];
          const size = item / (max ? max : sum) * 100;

          const style = {
            backgroundColor: color,
            zIndex: item,
            height: size + '%'
          };

          if (specialClassName === 'stacked') {
            style.opacity = 1;
          } else {
            style.opacity = item / max + 0.05;
          }

          if (specialClassName === 'layered') {
            style.right = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
          }

          if (isHorizontal) {
            style.width = style.height;
            delete style.height;
          }

          const chartsItemProps = {
            style: style,
            item: item,
            color: color,
          };

          if (specialClassName) {
            chartsItemProps.specialClassName = specialClassName;
          }

          return (
            <ChartsItem key={itemIndex} {...chartsItemProps} />
          );
        })
      }
    </div>
  );
}

function ChartsItem(props) {
  const { style, item, color, specialClassName } = props;
  const chartClassName = specialClassName ? `Charts--item ${specialClassName}` : `Charts--item`;

  return (
    <div className={chartClassName} style={style}>
      <b style={{color: color}}>{item}</b>
    </div>
  );
}