/**
 * This interface is annotating the data structure of the JSON file.
 */
export interface NodeInJsonFile {
    key: string;
    label: string;
    link: string;
    microflow?: string;
    external?: boolean;
}
