import React from 'react';

const SprintrBlock = ({ itemClass, isMobileMenuOpen }) => (
    <div>Sprintr Block</div>
);
const HeaderLink = ({ link, isMobileMenuOpen }) => <div>Header Link</div>;
const Profile = () => <div>Profile</div>;

interface NavBarProps {
    isMobileMenuOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isMobileMenuOpen }) => {
    const homeURL = '';
    const home = () => {};
    const img = '';
    const environment = 'production'; // ??? beaver???
    const links: string[] = [];
    const useProfile = true;

    return (
        <div ref="navbar">
            <div className="b('header')" ref="header">
                <a
                    target="_self"
                    href={homeURL}
                    className="b('brand')"
                    onClick={home}
                    id="mx-header-link-home"
                >
                    <img src={img} alt="Logo" v-track-link />
                </a>
            </div>
            <div className="b('collapse', { 'mobile': isMobileMenuOpen })">
                <div className="b('nav')">
                    {environment !== 'beaver' && (
                        <SprintrBlock
                            itemClass="b('item')"
                            isMobileMenuOpen={isMobileMenuOpen}
                        />
                    )}
                    <div className="b('item')" key="index">
                        {links.map(link => (
                            <HeaderLink
                                link={link}
                                isMobileMenuOpen={isMobileMenuOpen}
                            />
                        ))}
                    </div>
                    <div className="b('bottom')" />
                </div>
            </div>
            {useProfile && environment !== 'beaver' && <Profile />}
        </div>
    );
};

export default NavBar;
