'use strict';
function Accordion(props) {
  return (
    <main className='main'>
      <h2 className="title">React</h2>

      <AccordionSection>
        {{
          title: 'Компоненты',
          text: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.'
        }}
      </AccordionSection>

      <AccordionSection>
        {{
          title: 'Выучил раз, используй везде!',
          text: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.'
        }}
      </AccordionSection>

      <AccordionSection>
        {{
          title: 'Использование JSX',
          text: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.'
        }}
      </AccordionSection>
    </main>
  );
}

class AccordionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleAccordion = (event) => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const classNameByState = this.state.isOpen ? 'section open' : 'section';
    return (
      <section className={classNameByState}>

        <AccordionHead onClick={this.toggleAccordion}>
          {this.props.children.title}
        </AccordionHead>

        <AccordionArticle>
          {this.props.children.text}
        </AccordionArticle>

      </section>
    );
  }
}

function AccordionHead({ onClick, children }) {
  return (
    <div>
      <button onClick={onClick}>toggle</button>
      <h3 className='sectionhead' onClick={onClick}>{children}</h3>
    </div>
  );
}


function AccordionArticle({ children }) {
  return (
    <div className='articlewrap'>
      <div className='article'>
        {children}
      </div>
    </div>
  );
}

ReactDOM.render(
  <Accordion />,
  document.getElementById('accordian')
);