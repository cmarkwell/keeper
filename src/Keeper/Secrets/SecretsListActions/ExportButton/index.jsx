import { use, useMemo } from 'react';

import Link from '../../../../components/Link';
import { useSecrets } from '../../../../contexts/SecretsContext';

const ExportButton = () => {
    const { mySecretsPromise } = useSecrets();

    const mySecrets = use(mySecretsPromise);

    const exportUrl = useMemo(() => {
        const blob = new Blob([btoa(JSON.stringify(mySecrets))], { type: 'text/plain' });
        return URL.createObjectURL(blob);
    }, [mySecrets]);

    return (
        <Link rightIcon='bi-upload' href={exportUrl} download={`keeper_export_${Date.now()}.kpr`}>
            Export
        </Link>
    );
};

export default ExportButton;
