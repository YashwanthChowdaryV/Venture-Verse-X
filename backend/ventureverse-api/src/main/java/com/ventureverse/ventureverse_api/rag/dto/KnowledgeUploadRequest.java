package com.ventureverse.ventureverse_api.rag.dto;

import lombok.Data;

@Data
public class KnowledgeUploadRequest {

    private String title;

    private String content;
}