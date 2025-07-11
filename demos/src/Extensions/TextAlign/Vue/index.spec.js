context('/src/Extensions/TextAlign/Vue/', () => {
  before(() => {
    cy.visit('/src/Extensions/TextAlign/Vue/')
  })

  beforeEach(() => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p>Example Text</p>')
    })
  })

  it('should parse a null alignment correctly', () => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p>Example Text</p>')
      expect(editor.getHTML()).to.eq('<p>Example Text</p>')
    })
  })

  it('should parse left align text correctly (and not render)', () => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p style="text-align: left">Example Text</p>')
      expect(editor.getHTML()).to.eq('<p style="text-align: left">Example Text</p>')
    })
  })

  it('should parse center align text correctly', () => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p style="text-align: center">Example Text</p>')
      expect(editor.getHTML()).to.eq('<p style="text-align: center">Example Text</p>')
    })
  })

  it('should parse right align text correctly', () => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p style="text-align: right">Example Text</p>')
      expect(editor.getHTML()).to.eq('<p style="text-align: right">Example Text</p>')
    })
  })

  it('should parse left justify text correctly', () => {
    cy.get('.tiptap').then(([{ editor }]) => {
      editor.commands.setContent('<p style="text-align: justify">Example Text</p>')
      expect(editor.getHTML()).to.eq('<p style="text-align: justify">Example Text</p>')
    })
  })

  it('should keep the text aligned when toggling headings', () => {
    const alignments = ['center', 'right', 'justify']
    const headings = [1, 2]

    cy.get('.tiptap').then(([{ editor }]) => {
      alignments.forEach(alignment => {
        headings.forEach(level => {
          editor.commands.setContent(`<p style="text-align: ${alignment}">Example Text</p>`)
          editor.commands.toggleHeading({ level })
          expect(editor.getHTML()).to.eq(`<h${level} style="text-align: ${alignment}">Example Text</h${level}>`)
        })
      })
    })
  })

  it('aligns the text left on the 1st button', () => {
    cy.get('button:nth-child(1)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('have.css', 'text-align', 'left')
  })

  it('aligns the text center on the 2nd button', () => {
    cy.get('button:nth-child(2)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('have.css', 'text-align', 'center')
  })

  it('aligns the text right on the 3rd button', () => {
    cy.get('button:nth-child(3)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('have.css', 'text-align', 'right')
  })

  it('aligns the text justified on the 4th button', () => {
    cy.get('button:nth-child(4)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('have.css', 'text-align', 'justify')
  })

  it('aligns the text default on the 5th button', () => {
    cy.get('button:nth-child(5)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('not.have.css', 'text-align', 'left')
  })

  it('toggle the text to right on the 6rd button', () => {
    cy.get('button:nth-child(6)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('have.css', 'text-align', 'right')

    cy.get('button:nth-child(6)')
      .click()

    cy.get('.tiptap')
      .find('p')
      .should('not.have.css', 'text-align', 'right')
  })

  it('aligns the text left when pressing the keyboard shortcut', () => {
    cy.get('.tiptap')
      .trigger('keydown', { modKey: true, shiftKey: true, key: 'l' })
      .find('p')
      .should('have.css', 'text-align', 'left')
  })

  it('aligns the text center when pressing the keyboard shortcut', () => {
    cy.get('.tiptap')
      .trigger('keydown', { modKey: true, shiftKey: true, key: 'e' })
      .find('p')
      .should('have.css', 'text-align', 'center')
  })

  it('aligns the text right when pressing the keyboard shortcut', () => {
    cy.get('.tiptap')
      .trigger('keydown', { modKey: true, shiftKey: true, key: 'r' })
      .find('p')
      .should('have.css', 'text-align', 'right')
  })

  it('aligns the text justified when pressing the keyboard shortcut', () => {
    cy.get('.tiptap')
      .trigger('keydown', { modKey: true, shiftKey: true, key: 'j' })
      .find('p')
      .should('have.css', 'text-align', 'justify')
  })
})
