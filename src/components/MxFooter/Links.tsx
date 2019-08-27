import React, { ReactNode } from 'react';

import linkTree from '../../resources/menu/footer.json';

interface TreeNode {
    label?: string;
    url?: string;
    external?: boolean;
    highlighted?: boolean;
    nodes?: TreeNode[];
}

interface LinkProps {
    url?: string;
    className: string;
    external?: boolean;
    label: string;
}

const Link = ({ url, className, external, label }: LinkProps) => (
    <a href={url} className={className} target={external ? '_blank' : '_self'}>
        {label}
    </a>
);

const generateLink = ({
    highlighted = false,
    url,
    label,
    external = false,
}: TreeNode): ReactNode | null => {
    const className = highlighted
        ? 'MxFooter__link--highlighted'
        : 'MxFooter__link';

    if (!label) return null;

    const props: LinkProps = { url, className, external, label };

    return url ? (
        <Link {...props}></Link>
    ) : (
        <div className={className}>{label}</div>
    );
};

const generateBranch = ({ nodes, ...node }: TreeNode): ReactNode => (
    <>
        {generateLink(node)}
        {nodes && nodes.map(generateBranch)}
    </>
);

const Links = () => (
    <div className="MxFooter__links">{linkTree.map(generateBranch)}</div>
);

export default Links;
