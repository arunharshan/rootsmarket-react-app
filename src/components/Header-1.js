<Navbar
  collapseOnSelect
  expand='lg'
  bg={navbg}
  style={{ transition: '1.2s ease' }}
  className={navbg !== null ? 'sticky-top' : 'fixed-top'}
  ref={headerRef}
>
  <Navbar.Brand href='/'>rootsMarket</Navbar.Brand>
  <Navbar.Toggle aria-controls='responsive-navbar-nav' />
  <Navbar.Collapse id='responsive-navbar-nav'>
    {/* <Nav className='mr-auto'></Nav> */}
    <Nav>
      <Navbar.Text>Hi, Arun</Navbar.Text>
      <NavDropdown
        title={<i className='far fa-user-circle'></i>}
        id='collasible-nav-dropdown'
      >
        <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link>
        <i className='fas fa-shopping-bag'></i>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>;
