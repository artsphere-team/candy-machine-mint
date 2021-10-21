import React, { Ref, useCallback, useEffect, useState } from 'react';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Row, Col, Modal, Layout, Tag, Button, Skeleton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { PublicKey } from "@solana/web3.js";
import { useInView } from "react-intersection-observer";
import { useMeta } from "../../contexts/meta/meta";
import './index.css'

const { Content } = Layout;

const pubkeyToString = (key: PublicKey | null | string = '') => {
    return typeof key === 'string' ? key : key?.toBase58() || '';
  };

export const ArtModal = (props: any) => {
    let { artworkId, arworkidList, onSwipe, uri, ...rest } = props;
    const id = artworkId;
    const wallet = useAnchorWallet();
    const connection = useConnection();
    const { metadata, ownedMinerDwarfsMeta, isLoading } = useMeta()
    const [modalData, setmodalData] = useState({} as any)
    const [issueModalData, setissueModalData] = useState(false)
    var { ref } = useInView();

    var image = uri
    if (!isLoading && ownedMinerDwarfsMeta && !issueModalData){
        var met_img = ownedMinerDwarfsMeta.filter(m => pubkeyToString(m.info.mint) == id)[0]

        if (met_img?.data) {
        image = met_img.data.image
        if (!issueModalData) {
            setissueModalData(true)
            setmodalData(met_img)
        }
        console.log("pubkey", isLoading, met_img, id, "image", met_img.data.image, image, met_img, rest)
        }
    }

    return (
      <Modal
        style={{ padding: "0px !important" }}
        className={"artwork-modal"}
        footer={null}
        afterClose={() => null}
        destroyOnClose={true}
        bodyStyle={{ padding: "10", margin: "10"}}
        centered
        closable={true}
        maskClosable = {true}
        {...rest}
      >
      <Row justify="center" className="artwork-modal-row">
            <LeftOutlined
                className="artwork-modal-arrow"
                onClick={() => onSwipe("left")}
            />
                <Col className="artwork-modal-content">
                    HELLO
                </Col>
            <RightOutlined
                className="artwork-modal-arrow"
                onClick={() => onSwipe("right")}
            />
        </Row>
    </Modal>
    );
}